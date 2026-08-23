import torch
import torchvision.models as models


model = models.mobilenet_v2(weights=None)
in_features = model.classifier[1].in_features
model.classifier[1] = torch.nn.Linear(in_features, 163)  


model.load_state_dict(torch.load("v0.3_epoch26_20260807_072722_acc98.34.pth", map_location="cpu"))
model.eval()


dummy_input = torch.randn(1, 3, 224, 224)


torch.onnx.export(
    model,
    dummy_input,
    "model.onnx",
    input_names=["input"],
    output_names=["output"],
    opset_version=11
)
print("ONNX 模型已导出为 model.onnx")