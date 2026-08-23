# train.py - 基于 MobileNetV2 的中药材识别训练脚本
# 功能：训练 + TensorBoard 可视化 + GPU 监控 + 自动版本命名 + 断点续训 + 终止弹窗 + 混淆矩阵 + 弹窗选择续训/混淆矩阵
# 训练终端启动代码 python train.py

import os
import re
import time
import sys
import signal
import subprocess
import webbrowser
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import datasets, transforms, models
import matplotlib.pyplot as plt
from tqdm import tqdm
from torch.utils.tensorboard import SummaryWriter
from datetime import datetime
import tkinter as tk
from tkinter import messagebox
import numpy as np
import seaborn as sns
from sklearn.metrics import confusion_matrix

# ==================== 配置区 ====================
DATA_ROOT = "./cls_chinese_medicine"          # 数据集根目录
LABEL_FILE = "label.txt"                       # 标签文件
BATCH_SIZE = 64                                # GPU 环境下可以调到 64
EPOCHS = 40                                    # 训练轮数
LR = 0.001                                     # 学习率
NUM_WORKERS = 4                                # GPU 环境可调高
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
AUTO_SAVE_INTERVAL = 500                       # 每 500 个 batch 自动保存一次

# 日志和模型保存目录
LOG_DIR = r"F:\Always\开发\训练日志"
MODEL_SAVE_DIR = r"F:\Always\开发\模型迭代版本"
CHECKPOINT_DIR = r"F:\Always\开发\训练检查点"

# 确保目录存在
os.makedirs(LOG_DIR, exist_ok=True)
os.makedirs(MODEL_SAVE_DIR, exist_ok=True)
os.makedirs(CHECKPOINT_DIR, exist_ok=True)

# ==================== 全局变量 ====================
training_interrupted = False
current_epoch = 0

# ==================== 弹窗函数 ====================
def show_popup(title, message, icon="info"):
    """统一弹窗显示（Windows 原生消息框）"""
    try:
        root = tk.Tk()
        root.withdraw()
        if icon == "info":
            messagebox.showinfo(title, message)
        elif icon == "warning":
            messagebox.showwarning(title, message)
        elif icon == "error":
            messagebox.showerror(title, message)
        root.destroy()
    except:
        print(f"\n[弹窗] {title}: {message}")

# ==================== 信号处理函数（Ctrl+C 终止） ====================
def signal_handler(sig, frame):
    global training_interrupted, current_epoch
    training_interrupted = True
    print("\n\n[WARNING] 检测到中断信号 (Ctrl+C)，正在安全停止训练...")
    print("[WARNING] 当前进度已保存，下次运行将自动继续。")
    show_popup("训练已暂停", "训练已被手动中断。\n当前进度已保存，下次运行将自动继续。", "warning")
    save_checkpoint(current_epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
    sys.exit(0)

# ==================== 读取标签 ====================
def read_labels(label_path):
    with open(label_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    return [line.strip().split()[1] for line in lines if line.strip()]

# ==================== 自动生成版本号 ====================
def get_next_version(save_dir):
    existing_files = [f for f in os.listdir(save_dir) if f.endswith('.pth')]
    versions = []
    for f in existing_files:
        match = re.search(r'v(\d+\.\d+)', f)
        if match:
            versions.append(float(match.group(1)))
    if versions:
        max_ver = max(versions)
        major = int(max_ver)
        minor = int(round((max_ver - major) * 10))
        if minor >= 9:
            return f"v{major + 1}.0"
        else:
            return f"v{major}.{minor + 1}"
    return "v0.1"

# ==================== 启动 TensorBoard 并自动打开浏览器 ====================
def start_tensorboard(log_dir):
    tensorboard_cmd = f"tensorboard --logdir={log_dir} --port=6006"
    subprocess.Popen(tensorboard_cmd, shell=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("[INFO] 正在启动 TensorBoard，请稍候...")
    time.sleep(3)
    webbrowser.open("http://localhost:6006")
    print("[INFO] 浏览器已自动打开 TensorBoard：http://localhost:6006")

# ==================== 保存检查点 ====================
def save_checkpoint(epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version, is_final=False):
    checkpoint_path = os.path.join(CHECKPOINT_DIR, "checkpoint_latest.pth")
    checkpoint = {
        'epoch': epoch,
        'model_state_dict': model.state_dict(),
        'optimizer_state_dict': optimizer.state_dict(),
        'scheduler_state_dict': scheduler.state_dict(),
        'train_losses': train_losses,
        'val_accs': val_accs,
        'best_val_acc': best_val_acc,
        'version': version,
        'is_final': is_final
    }
    torch.save(checkpoint, checkpoint_path)
    if is_final:
        with open(os.path.join(CHECKPOINT_DIR, "training_complete.txt"), "w") as f:
            f.write(f"Training completed at {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            f.write(f"Best Val Acc: {best_val_acc*100:.2f}%\n")
            if val_accs:
                f.write(f"Final Val Acc: {val_accs[-1]*100:.2f}%\n")

# ==================== 加载检查点 ====================
def load_checkpoint(model, optimizer, scheduler):
    checkpoint_path = os.path.join(CHECKPOINT_DIR, "checkpoint_latest.pth")
    complete_flag = os.path.join(CHECKPOINT_DIR, "training_complete.txt")
    
    if os.path.exists(complete_flag):
        print("[INFO] 检测到训练已完成标记，将跳过训练，直接生成混淆矩阵。")
        return 0, [], [], 0.0, None, True  # 返回 is_completed = True
    
    if not os.path.exists(checkpoint_path):
        print("[INFO] 未找到检查点，从头开始训练。")
        return 0, [], [], 0.0, None, False
    
    print("[INFO] 发现检查点，正在加载...")
    checkpoint = torch.load(checkpoint_path, map_location=DEVICE)
    
    model.load_state_dict(checkpoint['model_state_dict'])
    optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
    scheduler.load_state_dict(checkpoint['scheduler_state_dict'])
    
    epoch = checkpoint['epoch']
    train_losses = checkpoint['train_losses']
    val_accs = checkpoint['val_accs']
    best_val_acc = checkpoint['best_val_acc']
    version = checkpoint['version']
    
    print(f"[INFO] 由于意外终止训练，将从第 {epoch+1} 轮继续进行。")
    print(f"[INFO] 当前最佳准确率: {best_val_acc*100:.2f}%")
    
    return epoch, train_losses, val_accs, best_val_acc, version, False

# ==================== 绘制混淆矩阵 ====================
def plot_confusion_matrix(model, val_loader, class_names, device, save_dir="."):
    """生成并保存混淆矩阵热力图"""
    model.eval()
    all_preds = []
    all_labels = []
    
    print("[INFO] 正在生成混淆矩阵...")
    with torch.no_grad():
        for images, labels in tqdm(val_loader, desc="推理验证集"):
            images, labels = images.to(device), labels.to(device)
            outputs = model(images)
            _, preds = torch.max(outputs, 1)
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(labels.cpu().numpy())
    
    # 计算混淆矩阵
    cm = confusion_matrix(all_labels, all_preds)
    
    # 1. 完整混淆矩阵热力图
    plt.figure(figsize=(20, 18))
    sns.heatmap(cm, annot=False, fmt='d', cmap='Blues',
                xticklabels=class_names, yticklabels=class_names,
                cbar_kws={'label': '样本数量'})
    plt.xlabel('预测类别')
    plt.ylabel('真实类别')
    plt.title('混淆矩阵 - 163类中药材识别')
    plt.xticks(rotation=90, fontsize=6)
    plt.yticks(rotation=0, fontsize=6)
    plt.tight_layout()
    plt.savefig(os.path.join(save_dir, "confusion_matrix.png"), dpi=300)
    plt.close()
    print(f"[INFO] 完整混淆矩阵已保存为 {save_dir}/confusion_matrix.png")
    
    # 2. 准确率最高的20类
    class_acc = cm.diagonal() / cm.sum(axis=1)
    top_indices = np.argsort(class_acc)[-20:][::-1]
    top_names = [class_names[i] for i in top_indices]
    top_acc = [class_acc[i] for i in top_indices]
    
    plt.figure(figsize=(12, 8))
    plt.barh(top_names, top_acc, color='steelblue')
    plt.xlabel('准确率')
    plt.title('准确率最高的20类中药材')
    plt.tight_layout()
    plt.savefig(os.path.join(save_dir, "top20_accuracy.png"), dpi=300)
    plt.close()
    print(f"[INFO] 前20类准确率图表已保存为 {save_dir}/top20_accuracy.png")
    
    # 3. 易混淆的类别对
    misclass_pairs = []
    for i in range(len(class_names)):
        for j in range(len(class_names)):
            if i != j and cm[i][j] > 10:
                misclass_pairs.append((class_names[i], class_names[j], cm[i][j]))
    misclass_pairs.sort(key=lambda x: -x[2])
    
    if misclass_pairs:
        print("\n[INFO] 易混淆的类别对（错误次数 > 10）：")
        for src, tgt, cnt in misclass_pairs[:20]:
            print(f"  {src} → {tgt}: {cnt} 次")
    
    # 4. 总体准确率
    total_acc = cm.diagonal().sum() / cm.sum()
    print(f"\n[INFO] 总体准确率: {total_acc*100:.2f}%")
    
    return cm

# ==================== 生成混淆矩阵（从已有模型） ====================
def generate_confusion_matrix_from_best_model():
    """加载最佳模型并生成混淆矩阵"""
    print("\n" + "="*60)
    print("[INFO] 进入混淆矩阵生成模式")
    print("="*60)
    
    # 读取类别名称
    class_names = read_labels(os.path.join(DATA_ROOT, LABEL_FILE))
    num_classes = len(class_names)
    print(f"[INFO] 共 {num_classes} 个类别")
    
    # 加载验证集
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])
    val_dataset = datasets.ImageFolder(os.path.join(DATA_ROOT, "val"), transform=transform)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=NUM_WORKERS)
    print(f"[INFO] 验证集: {len(val_dataset)} 张")
    
    # 查找最佳模型文件
    model_files = [f for f in os.listdir(MODEL_SAVE_DIR) if f.endswith('.pth')]
    if not model_files:
        print("[ERROR] 未找到任何模型文件！")
        return
    
    # 按准确率排序，取最高的
    # 文件名格式: v0.1_epoch3_20260721_211831_acc93.99.pth
    def extract_acc(filename):
        match = re.search(r'acc(\d+\.\d+)', filename)
        return float(match.group(1)) if match else 0.0
    
    model_files.sort(key=extract_acc, reverse=True)
    best_model_path = os.path.join(MODEL_SAVE_DIR, model_files[0])
    print(f"[INFO] 使用最佳模型: {model_files[0]}")
    
    # 加载模型
    model = models.mobilenet_v2(weights=None)
    in_features = model.classifier[1].in_features
    model.classifier[1] = nn.Linear(in_features, num_classes)
    model.load_state_dict(torch.load(best_model_path, map_location=DEVICE))
    model = model.to(DEVICE)
    print(f"[INFO] 模型加载成功")
    
    # 生成混淆矩阵
    plot_confusion_matrix(model, val_loader, class_names, DEVICE, save_dir=".")
    print("\n[INFO] 混淆矩阵生成完成！")
    print("[INFO] 生成的文件：")
    print("  - confusion_matrix.png（完整混淆矩阵热力图）")
    print("  - top20_accuracy.png（准确率最高的20类）")

# ==================== 主程序 ====================
if __name__ == "__main__":
    # 启动 TensorBoard
    start_tensorboard(LOG_DIR)

    # 读取类别名称
    CLASS_NAMES = read_labels(os.path.join(DATA_ROOT, LABEL_FILE))
    NUM_CLASSES = len(CLASS_NAMES)
    print(f"[INFO] 共 {NUM_CLASSES} 个类别：{CLASS_NAMES[:5]}...")

    # 数据增强（训练集）
    train_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.RandomHorizontalFlip(),
        transforms.RandomRotation(15),
        transforms.ColorJitter(brightness=0.2, contrast=0.2),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    # 验证集（只做标准化，不做增强）
    val_transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

    # 加载数据集
    train_dataset = datasets.ImageFolder(os.path.join(DATA_ROOT, "train"), transform=train_transform)
    val_dataset = datasets.ImageFolder(os.path.join(DATA_ROOT, "val"), transform=val_transform)

    train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True, num_workers=NUM_WORKERS)
    val_loader = DataLoader(val_dataset, batch_size=BATCH_SIZE, shuffle=False, num_workers=NUM_WORKERS)

    print(f"[INFO] 训练集: {len(train_dataset)} 张, 验证集: {len(val_dataset)} 张")

    # TensorBoard Writer
    writer = SummaryWriter(LOG_DIR)
    print(f"[INFO] TensorBoard 日志目录: {LOG_DIR}")

    # ==================== 检查是否已完成训练 ====================
    complete_flag = os.path.join(CHECKPOINT_DIR, "training_complete.txt")
    
    if os.path.exists(complete_flag):
        # ========== 先获取已有模型的版本号 ==========
        existing_models = [f for f in os.listdir(MODEL_SAVE_DIR) if f.endswith('.pth')]
        version_display = "未知版本"
        if existing_models:
            existing_models.sort()
            latest = existing_models[-1]
            match = re.search(r'v(\d+\.\d+)', latest)
            if match:
                version_display = match.group(1)
        
        root = tk.Tk()
        root.withdraw()
        choice = messagebox.askyesno(
            "训练已完成",
            f"检测到已完成的训练 (版本: {version_display})。\n\n"
            "点击「是」继续训练 \n"
            "点击「否」生成混淆矩阵"
        )
        root.destroy()
        
        if choice:

            print("[INFO] 用户选择继续训练，将移除完成标记并续训")
            
            # 尝试查找当前版本号（从已有的模型文件中提取）
            existing_model_files = [f for f in os.listdir(MODEL_SAVE_DIR) if f.endswith('.pth')]
            if existing_model_files:
                existing_model_files.sort()
                latest_model = existing_model_files[-1]
                match = re.search(r'v(\d+\.\d+)', latest_model)
                if match:
                    version = match.group(1)
                    print(f"[INFO] 检测到已有模型版本: {version}，将继续使用该版本续训")
                else:
                    version = get_next_version(MODEL_SAVE_DIR)
                    print(f"[INFO] 未识别出版本号，将生成新版本: {version}")
            else:
                version = get_next_version(MODEL_SAVE_DIR)
                print(f"[INFO] 未找到已有模型，将生成新版本: {version}")
            
            # 备份并移除完成标记，让代码认为训练未完成
            backup_flag = complete_flag + ".bak"
            if os.path.exists(backup_flag):
                os.remove(backup_flag)
            os.rename(complete_flag, backup_flag)
            print(f"[INFO] 完成标记已备份为: {backup_flag}")
            
            # 加载 MobileNetV2 预训练模型
            model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
            in_features = model.classifier[1].in_features
            model.classifier[1] = nn.Linear(in_features, NUM_CLASSES)
            model = model.to(DEVICE)
            
            criterion = nn.CrossEntropyLoss()
            optimizer = optim.Adam(model.parameters(), lr=LR)
            scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=5, factor=0.5)
            
            # 尝试加载检查点（如果有中断的）
            start_epoch, train_losses, val_accs, best_val_acc, loaded_version, is_completed = load_checkpoint(model, optimizer, scheduler)
            if loaded_version is not None and loaded_version != version:
                version = loaded_version
            
            # 计算 global_step
            global_step = 0
            if start_epoch > 0:
                for epoch in range(start_epoch):
                    global_step += len(train_loader)
                print(f"[INFO] 恢复 global_step: {global_step}")
                show_popup("训练已恢复", f"检测到未完成的训练，将从第 {start_epoch+1} 轮继续。\n当前最佳准确率: {best_val_acc*100:.2f}%", "info")
            else:
                show_popup("训练已开始", f"训练已启动！\n共 {EPOCHS} 轮，请查看 TensorBoard 监控。", "info")
            
            print(f"[INFO] 当前版本: {version}")
            print(f"[INFO] 训练设备: {DEVICE}")
            print(f"[INFO] 开始训练，共 {EPOCHS} 轮...")
            
            # 注册信号处理
            signal.signal(signal.SIGINT, signal_handler)
            
            # ==================== 训练循环 ====================
            for epoch in range(start_epoch, EPOCHS):
                current_epoch = epoch
                if training_interrupted:
                    save_checkpoint(epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
                    sys.exit(0)

                model.train()
                running_loss = 0.0

                loop = tqdm(train_loader, desc=f"Epoch {epoch+1}/{EPOCHS}")
                for batch_idx, (images, labels) in enumerate(loop):
                    if training_interrupted:
                        save_checkpoint(epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
                        print("[INFO] 训练已安全暂停，检查点已保存。")
                        print(f"[INFO] 下次运行将自动从第 {epoch+1} 轮继续。")
                        sys.exit(0)

                    images, labels = images.to(DEVICE), labels.to(DEVICE)
                    optimizer.zero_grad()
                    outputs = model(images)
                    loss = criterion(outputs, labels)
                    loss.backward()
                    optimizer.step()

                    running_loss += loss.item() * images.size(0)
                    loop.set_postfix(loss=loss.item())

                    writer.add_scalar('Loss/Batch_Train', loss.item(), global_step)
                    if torch.cuda.is_available():
                        gpu_memory = torch.cuda.memory_allocated() / 1024**2
                        writer.add_scalar('GPU/Memory_Allocated_MB', gpu_memory, global_step)
                    global_step += 1

                    # 自动检查点保存（每 500 个 batch）
                    if batch_idx % AUTO_SAVE_INTERVAL == 0 and batch_idx > 0:
                        save_checkpoint(epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
                        print(f"[AUTO] 检查点已自动保存 (epoch {epoch+1}, batch {batch_idx})")

                epoch_loss = running_loss / len(train_dataset)
                train_losses.append(epoch_loss)

                # 验证
                model.eval()
                val_correct = 0
                val_total = 0
                with torch.no_grad():
                    for images, labels in val_loader:
                        images, labels = images.to(DEVICE), labels.to(DEVICE)
                        outputs = model(images)
                        _, preds = torch.max(outputs, 1)
                        val_total += labels.size(0)
                        val_correct += (preds == labels).sum().item()
                val_acc = val_correct / val_total
                val_accs.append(val_acc)

                scheduler.step(epoch_loss)

                writer.add_scalar('Loss/Epoch_Train', epoch_loss, epoch)
                writer.add_scalar('Accuracy/Epoch_Val', val_acc, epoch)
                writer.add_scalar('Learning_Rate', optimizer.param_groups[0]['lr'], epoch)

                print(f"Epoch {epoch+1}/{EPOCHS}: Train Loss = {epoch_loss:.4f}, Val Acc = {val_acc:.4f}")

                # 保存检查点（每个 epoch 结束后）
                save_checkpoint(epoch + 1, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
                print(f"[INFO] 检查点已保存（第 {epoch+1} 轮）")

                # 保存最佳模型
                if val_acc > best_val_acc:
                    best_val_acc = val_acc
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"{version}_epoch{epoch+1}_{timestamp}_acc{val_acc*100:.2f}.pth"
                    save_path = os.path.join(MODEL_SAVE_DIR, filename)
                    torch.save(model.state_dict(), save_path)
                    print(f"[INFO] ✅ 最佳模型已保存：{filename} (准确率: {val_acc*100:.2f}%)")

            # ==================== 训练完成 ====================
            save_checkpoint(EPOCHS, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version, is_final=True)

            # 保存最终模型
            final_version = get_next_version(MODEL_SAVE_DIR)
            final_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            final_filename = f"{final_version}_epoch{EPOCHS}_{final_timestamp}_acc{val_acc*100:.2f}.pth"
            final_path = os.path.join(MODEL_SAVE_DIR, final_filename)
            torch.save(model.state_dict(), final_path)
            print(f"[INFO] ✅ 最终模型已保存：{final_path}")

            writer.close()
            print("[INFO] TensorBoard 日志已保存，训练结束。")
            print(f"[INFO] 训练完成！最终验证准确率: {val_acc*100:.2f}%")
            print(f"[INFO] 最佳验证准确率: {best_val_acc*100:.2f}%")

            show_popup("训练已完成", f"训练已全部完成！\n最佳准确率: {best_val_acc*100:.2f}%\n最终准确率: {val_acc*100:.2f}%", "info")

            # 绘制训练曲线
            plt.figure(figsize=(12, 4))
            plt.subplot(1, 2, 1)
            plt.plot(train_losses, label="Train Loss")
            plt.xlabel("Epoch")
            plt.ylabel("Loss")
            plt.legend()

            plt.subplot(1, 2, 2)
            plt.plot(val_accs, label="Val Accuracy")
            plt.xlabel("Epoch")
            plt.ylabel("Accuracy")
            plt.legend()

            plt.tight_layout()
            plt.savefig("training_curve.png")
            plt.show()
            print("[INFO] 训练曲线已保存为 training_curve.png")

            # ==================== 生成混淆矩阵 ====================
            print("\n[INFO] 开始生成混淆矩阵...")
            try:
                # 加载最佳模型
                model_files = [f for f in os.listdir(MODEL_SAVE_DIR) if f.endswith('.pth')]
                if model_files:
                    def extract_acc(filename):
                        match = re.search(r'acc(\d+\.\d+)', filename)
                        return float(match.group(1)) if match else 0.0
                    model_files.sort(key=extract_acc, reverse=True)
                    best_model_path = os.path.join(MODEL_SAVE_DIR, model_files[0])
                    print(f"[INFO] 使用最佳模型: {model_files[0]}")
                    model.load_state_dict(torch.load(best_model_path, map_location=DEVICE))
                
                plot_confusion_matrix(model, val_loader, CLASS_NAMES, DEVICE, save_dir=".")
                print("[INFO] 混淆矩阵生成完成！")
                show_popup("混淆矩阵生成完成", "混淆矩阵已生成！\n请查看项目目录下的 confusion_matrix.png", "info")
            except Exception as e:
                print(f"[WARNING] 混淆矩阵生成失败: {e}")
                print("[INFO] 请确保已安装 seaborn 和 scikit-learn: pip install seaborn scikit-learn")
        
        else:
            # ====== 用户选择「否」：生成混淆矩阵 ======
            generate_confusion_matrix_from_best_model()
            show_popup("混淆矩阵生成完成", "模型已加载，混淆矩阵已生成！\n请查看项目目录下的 confusion_matrix.png", "info")
            sys.exit(0)
    
    else:
        # ==================== 正常训练流程 ====================
        # 加载 MobileNetV2 预训练模型
        model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
        in_features = model.classifier[1].in_features
        model.classifier[1] = nn.Linear(in_features, NUM_CLASSES)
        model = model.to(DEVICE)

        criterion = nn.CrossEntropyLoss()
        optimizer = optim.Adam(model.parameters(), lr=LR)
        scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=5, factor=0.5)

        # 尝试加载检查点
        start_epoch, train_losses, val_accs, best_val_acc, version, is_completed = load_checkpoint(model, optimizer, scheduler)
        if is_completed:
            generate_confusion_matrix_from_best_model()
            show_popup("混淆矩阵生成完成", "模型已加载，混淆矩阵已生成！\n请查看项目目录下的 confusion_matrix.png", "info")
            sys.exit(0)
        
        if version is None:
            version = get_next_version(MODEL_SAVE_DIR)

        # 计算 global_step
        global_step = 0
        if start_epoch > 0:
            for epoch in range(start_epoch):
                global_step += len(train_loader)
            print(f"[INFO] 恢复 global_step: {global_step}")
            show_popup("训练已恢复", f"检测到未完成的训练，将从第 {start_epoch+1} 轮继续。\n当前最佳准确率: {best_val_acc*100:.2f}%", "info")
        else:
            show_popup("训练已开始", f"训练已启动！\n共 {EPOCHS} 轮，请查看 TensorBoard 监控。", "info")

        print(f"[INFO] 当前版本: {version}")
        print(f"[INFO] 训练设备: {DEVICE}")
        print(f"[INFO] 开始训练，共 {EPOCHS} 轮...")

        # 注册信号处理
        signal.signal(signal.SIGINT, signal_handler)

        # ==================== 训练循环 ====================
        for epoch in range(start_epoch, EPOCHS):
            current_epoch = epoch
            if training_interrupted:
                save_checkpoint(epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
                sys.exit(0)

            model.train()
            running_loss = 0.0

            loop = tqdm(train_loader, desc=f"Epoch {epoch+1}/{EPOCHS}")
            for batch_idx, (images, labels) in enumerate(loop):
                if training_interrupted:
                    save_checkpoint(epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
                    print("[INFO] 训练已安全暂停，检查点已保存。")
                    print(f"[INFO] 下次运行将自动从第 {epoch+1} 轮继续。")
                    sys.exit(0)

                images, labels = images.to(DEVICE), labels.to(DEVICE)
                optimizer.zero_grad()
                outputs = model(images)
                loss = criterion(outputs, labels)
                loss.backward()
                optimizer.step()

                running_loss += loss.item() * images.size(0)
                loop.set_postfix(loss=loss.item())

                writer.add_scalar('Loss/Batch_Train', loss.item(), global_step)
                if torch.cuda.is_available():
                    gpu_memory = torch.cuda.memory_allocated() / 1024**2
                    writer.add_scalar('GPU/Memory_Allocated_MB', gpu_memory, global_step)
                global_step += 1

                # 自动检查点保存（每 500 个 batch）
                if batch_idx % AUTO_SAVE_INTERVAL == 0 and batch_idx > 0:
                    save_checkpoint(epoch, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
                    print(f"[AUTO] 检查点已自动保存 (epoch {epoch+1}, batch {batch_idx})")

            epoch_loss = running_loss / len(train_dataset)
            train_losses.append(epoch_loss)

            # 验证
            model.eval()
            val_correct = 0
            val_total = 0
            with torch.no_grad():
                for images, labels in val_loader:
                    images, labels = images.to(DEVICE), labels.to(DEVICE)
                    outputs = model(images)
                    _, preds = torch.max(outputs, 1)
                    val_total += labels.size(0)
                    val_correct += (preds == labels).sum().item()
            val_acc = val_correct / val_total
            val_accs.append(val_acc)

            scheduler.step(epoch_loss)

            writer.add_scalar('Loss/Epoch_Train', epoch_loss, epoch)
            writer.add_scalar('Accuracy/Epoch_Val', val_acc, epoch)
            writer.add_scalar('Learning_Rate', optimizer.param_groups[0]['lr'], epoch)

            print(f"Epoch {epoch+1}/{EPOCHS}: Train Loss = {epoch_loss:.4f}, Val Acc = {val_acc:.4f}")

            # 保存检查点（每个 epoch 结束后）
            save_checkpoint(epoch + 1, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version)
            print(f"[INFO] 检查点已保存（第 {epoch+1} 轮）")

            # 保存最佳模型
            if val_acc > best_val_acc:
                best_val_acc = val_acc
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"{version}_epoch{epoch+1}_{timestamp}_acc{val_acc*100:.2f}.pth"
                save_path = os.path.join(MODEL_SAVE_DIR, filename)
                torch.save(model.state_dict(), save_path)
                print(f"[INFO] ✅ 最佳模型已保存：{filename} (准确率: {val_acc*100:.2f}%)")

        # ==================== 训练完成 ====================
        save_checkpoint(EPOCHS, model, optimizer, scheduler, train_losses, val_accs, best_val_acc, version, is_final=True)

        # 保存最终模型
        final_version = get_next_version(MODEL_SAVE_DIR)
        final_timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        final_filename = f"{final_version}_epoch{EPOCHS}_{final_timestamp}_acc{val_acc*100:.2f}.pth"
        final_path = os.path.join(MODEL_SAVE_DIR, final_filename)
        torch.save(model.state_dict(), final_path)
        print(f"[INFO] ✅ 最终模型已保存：{final_path}")

        writer.close()
        print("[INFO] TensorBoard 日志已保存，训练结束。")
        print(f"[INFO] 训练完成！最终验证准确率: {val_acc*100:.2f}%")
        print(f"[INFO] 最佳验证准确率: {best_val_acc*100:.2f}%")

        show_popup("训练已完成", f"训练已全部完成！\n最佳准确率: {best_val_acc*100:.2f}%\n最终准确率: {val_acc*100:.2f}%", "info")

        # 绘制训练曲线
        plt.figure(figsize=(12, 4))
        plt.subplot(1, 2, 1)
        plt.plot(train_losses, label="Train Loss")
        plt.xlabel("Epoch")
        plt.ylabel("Loss")
        plt.legend()

        plt.subplot(1, 2, 2)
        plt.plot(val_accs, label="Val Accuracy")
        plt.xlabel("Epoch")
        plt.ylabel("Accuracy")
        plt.legend()

        plt.tight_layout()
        plt.savefig("training_curve.png")
        plt.show()
        print("[INFO] 训练曲线已保存为 training_curve.png")

        # ==================== 生成混淆矩阵 ====================
        print("\n[INFO] 开始生成混淆矩阵...")
        try:
            # 加载最佳模型
            model_files = [f for f in os.listdir(MODEL_SAVE_DIR) if f.endswith('.pth')]
            if model_files:
                def extract_acc(filename):
                    match = re.search(r'acc(\d+\.\d+)', filename)
                    return float(match.group(1)) if match else 0.0
                model_files.sort(key=extract_acc, reverse=True)
                best_model_path = os.path.join(MODEL_SAVE_DIR, model_files[0])
                print(f"[INFO] 使用最佳模型: {model_files[0]}")
                model.load_state_dict(torch.load(best_model_path, map_location=DEVICE))
            
            plot_confusion_matrix(model, val_loader, CLASS_NAMES, DEVICE, save_dir=".")
            print("[INFO] 混淆矩阵生成完成！")
            show_popup("混淆矩阵生成完成", "混淆矩阵已生成！\n请查看项目目录下的 confusion_matrix.png", "info")
        except Exception as e:
            print(f"[WARNING] 混淆矩阵生成失败: {e}")
            print("[INFO] 请确保已安装 seaborn 和 scikit-learn: pip install seaborn scikit-learn")