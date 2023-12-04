import torch
from torchvision import models, transforms
from PIL import Image

# Define the model
class PostureModel:
    def __init__(self):
        self.model = models.resnet18()
        num_ftrs = self.model.fc.in_features
        self.model.fc = torch.nn.Linear(num_ftrs, 4)  # 4 classes
        self.model.load_state_dict(torch.load('./model_weights.pth'))
        self.model.eval()

        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor()
        ])

    def analyze_image(self, image):
        image = self.transform(image).unsqueeze(0)

        with torch.no_grad():
            outputs = self.model(image)
            _, predicted = torch.max(outputs, 1)

        # Map index to class
        classes = ['correct', 'neck', 'shoulder', 'waist']
        result = classes[predicted[0]]
        return result
