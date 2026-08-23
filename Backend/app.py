from flask import Flask, request, jsonify
from flask_cors import CORS
import onnxruntime as ort
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
CORS(app)

# ==================== 加载 ONNX 模型 ====================
session = ort.InferenceSession("model.onnx")
input_name = session.get_inputs()[0].name
output_name = session.get_outputs()[0].name

# ==================== 读取标签 ====================
def load_class_names(label_path="label.txt"):
    with open(label_path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    return [line.strip().split()[1] for line in lines if line.strip()]

CLASS_NAMES = load_class_names()

# ==================== 英文 → 中文映射 ====================
NAME_MAP = {
    "aiye": "艾叶",
    "ajiao": "阿胶",
    "baibiandou": "白扁豆",
    "baibu": "百部",
    "baifan": "白矾",
    "baihe": "百合",
    "baihuasheshecao": "白花蛇舌草",
    "baikou": "白蔻",
    "baimaogen": "白茅根",
    "baishao": "白芍",
    "baitouweng": "白头翁",
    "baizhu": "白术",
    "baiziren": "柏子仁",
    "bajitian": "巴戟天",
    "banlangen": "板蓝根",
    "banxia": "半夏",
    "beishashenkuai": "北沙参块",
    "beishashentiao": "北沙参条",
    "biejia": "鳖甲",
    "cangzhu": "苍术",
    "caoguo": "草果",
    "caokou": "草蔻",
    "cebaiye": "侧柏叶",
    "chaihu": "柴胡",
    "chantui": "蝉蜕",
    "chenpi": "陈皮",
    "chenxiang": "沉香",
    "chishao": "赤芍",
    "chishizhi": "赤石脂",
    "chongcao": "虫草",
    "chuanshanjia": "穿山甲",
    "chuanxinlian": "穿心莲",
    "cishi": "磁石",
    "dafupi": "大腹皮",
    "dangshen": "党参",
    "danshen": "丹参",
    "daqingye": "大青叶",
    "daxueteng": "大血藤",
    "digupi": "地骨皮",
    "dilong": "地龙",
    "diyu": "地榆",
    "duzhong": "杜仲",
    "fangfeng": "防风",
    "foshou": "佛手",
    "fuling": "茯苓",
    "fupenzi": "覆盆子",
    "fuzi": "附子",
    "gancao": "甘草",
    "ganjiang": "干姜",
    "gegen": "葛根",
    "gouqizi": "枸杞子",
    "gouteng": "钩藤",
    "guanzhong": "贯众",
    "guya": "谷芽",
    "hehuanpi": "合欢皮",
    "heshouwu": "何首乌",
    "honghua": "红花",
    "hongkou": "红蔻",
    "houpu": "厚朴",
    "huaihua": "槐花",
    "huangbo": "黄柏",
    "huangjing": "黄精",
    "huangqin": "黄芩",
    "huomaren": "火麻仁",
    "huzhang": "虎杖",
    "jiangcan": "僵蚕",
    "jianghuang": "姜黄",
    "jineijin": "鸡内金",
    "jingjie": "荆芥",
    "jinqiancao": "金钱草",
    "jinyinhua": "金银花",
    "jixueteng": "鸡血藤",
    "juemingzi": "决明子",
    "kushen": "苦参",
    "laifuzi": "莱菔子",
    "lianqiao": "连翘",
    "lianzixin": "莲子心",
    "lingzhi": "灵芝",
    "lizhihe": "荔枝核",
    "longgu": "龙骨",
    "lulutong": "路路通",
    "luohanguo": "罗汉果",
    "luoshiteng": "络石藤",
    "maidong": "麦冬",
    "maiya": "麦芽",
    "mohanlian": "墨旱莲",
    "mudanpi": "牡丹皮",
    "muli": "牡蛎",
    "muxiang": "木香",
    "niuxi": "牛膝",
    "nvzhenzi": "女贞子",
    "paojiang": "炮姜",
    "peilan": "佩兰",
    "pugongying": "蒲公英",
    "puhuang": "蒲黄",
    "qianghuo": "羌活",
    "qianhu": "前胡",
    "qinghao": "青蒿",
    "quanxie": "全蝎",
    "renshen": "人参",
    "renshenqiepian": "人参切片",
    "roucongronggen": "肉苁蓉根",
    "roucongrongpian": "肉苁蓉片",
    "roudoukou": "肉豆蔻",
    "rougui": "肉桂",
    "sangpiaoxiao": "桑螵蛸",
    "sangshen": "桑椹",
    "sanqi": "三七",
    "shanyao": "山药",
    "shanzha": "山楂",
    "shanzhuyu": "山茱萸",
    "sharen": "砂仁",
    "shechuangzi": "蛇床子",
    "shegan": "射干",
    "shengma": "升麻",
    "shenqu": "神曲",
    "shichangpu": "石菖蒲",
    "shigao": "石膏",
    "shihu": "石斛",
    "shouwutengkuai": "首乌藤块",
    "shouwutengpian": "首乌藤片",
    "shuihonghuazi": "水红花子",
    "shuiniujiao": "水牛角",
    "suanzaoren": "酸枣仁",
    "taoren": "桃仁",
    "tiandong": "天冬",
    "tiankuizi": "天葵子",
    "tianmakuai": "天麻块",
    "tianmapian": "天麻片",
    "tiannanxing": "天南星",
    "tongcao": "通草",
    "tubiechong": "土鳖虫",
    "tusizi": "菟丝子",
    "wujiapi": "五加皮",
    "wulingzhi": "五灵脂",
    "wumei": "乌梅",
    "wuweizi": "五味子",
    "xiakucao": "夏枯草",
    "xiangfu": "香附",
    "xianhecao": "仙鹤草",
    "xiaohuixiang": "小茴香",
    "xinyi": "辛夷",
    "xixin": "细辛",
    "xuduan": "续断",
    "yejuhua": "野菊花",
    "yimucao": "益母草",
    "yinchen": "茵陈",
    "yiyiren": "薏苡仁",
    "yuanzhi": "远志",
    "yujin": "郁金",
    "yuzhupian": "玉竹片",
    "yuzhutiao": "玉竹条",
    "zelan": "泽兰",
    "zhebeimu": "浙贝母",
    "zhenzhumu": "珍珠母",
    "zhimu": "知母",
    "zhiqiaopian": "枳壳片",
    "zhiqiaotiao": "枳壳条",
    "zhishi": "枳实",
    "zhuru": "竹茹",
    "zicao": "紫草",
    "zihuadiding": "紫花地丁",
    "ziyuan": "紫苑"
}

# ==================== 图片预处理 ====================
def preprocess_image(image):
    """纯 PIL 预处理，不依赖 torchvision"""
    image = image.resize((224, 224), Image.BILINEAR)
    img_array = np.array(image, dtype=np.float32) / 255.0
    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32)
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32)
    img_array = (img_array - mean) / std
    img_array = img_array.transpose((2, 0, 1))
    return np.expand_dims(img_array, axis=0).astype(np.float32)

# ==================== 路由 ====================
@app.route('/')
def hello():
    return jsonify({"message": "Flask 服务已启动！"})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if data and 'image' in data:
            img_data = base64.b64decode(data['image'])
            img = Image.open(io.BytesIO(img_data)).convert('RGB')
        elif 'image' in request.files:
            file = request.files['image']
            if file.filename == '':
                return jsonify({"success": False, "error": "文件名为空"}), 200
            img = Image.open(io.BytesIO(file.read())).convert('RGB')
        else:
            return jsonify({"success": False, "error": "未上传图片"}), 200

        img_tensor = preprocess_image(img)
        outputs = session.run([output_name], {input_name: img_tensor})[0]

        pred = np.argmax(outputs, axis=1)[0]
        exp_outputs = np.exp(outputs[0])
        confidence = exp_outputs[pred] / np.sum(exp_outputs)

        result_en = CLASS_NAMES[pred]
        result_cn = NAME_MAP.get(result_en, result_en)

        return jsonify({
            "success": True,
            "result": result_en,
            "result_cn": result_cn,
            "confidence": float(confidence)
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)