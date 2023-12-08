import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import models, datasets, transforms
from torch.utils.data import DataLoader
import time
import matplotlib.pyplot as plt

# Check device
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

transformations = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

train_dataset = datasets.ImageFolder('./data/train', transform=transformations)
val_dataset = datasets.ImageFolder('./data/val', transform=transformations)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.fc1 = nn.Linear(64 * 56 * 56, 128)  # Adjust input size based on your image size
        self.fc2 = nn.Linear(128, 4)

    def forward(self, x):
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2(x), 2))
        x = x.view(x.size(0), -1)  # Flatten layer
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x

simple_cnn = SimpleCNN().to(device)

resnet18 = models.resnet18(pretrained=False)
resnet18.fc = nn.Linear(resnet18.fc.in_features, 4)
resnet18 = resnet18.to(device)

vgg16_pretrained = models.vgg16(pretrained=True)
vgg16_pretrained.classifier[6] = nn.Linear(4096, 4)
vgg16_pretrained = vgg16_pretrained.to(device)

vgg16_not_pretrained = models.vgg16(pretrained=False)
vgg16_not_pretrained.classifier[6] = nn.Linear(4096, 4)
vgg16_not_pretrained = vgg16_not_pretrained.to(device)

class PostureModel(nn.Module):
    def __init__(self):
        super(PostureModel, self).__init__()
        self.model = models.resnet18(pretrained=True)
        num_ftrs = self.model.fc.in_features
        self.model.fc = nn.Linear(num_ftrs, 4)  # 4 classes

    def forward(self, x):
        return self.model(x)

posture_model = PostureModel().to(device)

def train_model(model, train_loader, val_loader, num_epochs=10):
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)
    
    model.to(device)
    start_time = time.time()
    
    train_loss = []
    val_accuracy = []

    for epoch in range(num_epochs):
        model.train()
        running_loss = 0.0
        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
    
        # Average loss for this epoch
        epoch_loss = running_loss / len(train_loader)
        train_loss.append(epoch_loss)
        correct = 0
        total = 0
        model.eval()
        with torch.no_grad():
             for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()

        accuracy = 100 * correct / total
        val_accuracy.append(accuracy)
        print(f'Epoch {epoch+1}, Loss: {epoch_loss:.4f}, Validation Accuracy: {accuracy:.2f}%')

def evaluate_model(model, loader):
    correct = 0
    total = 0
    model.eval()
    with torch.no_grad():
        for inputs, labels in loader:
            inputs, labels = inputs.to(device), labels.to(device)
            outputs = model(inputs)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    accuracy = 100 * correct / total
    return accuracy

def measure_inference_time(model, loader):
    model.eval()
    start_time = time.time()
    with torch.no_grad():
        for inputs, _ in loader:
            inputs = inputs.to(device)
            _ = model(inputs)
    end_time = time.time()
    return end_time - start_time

models_to_train = {
    'PostureModel': posture_model,
    'ResNet18': resnet18,
    'SimpleCNN': simple_cnn,
    'VGG16_Pretrained': vgg16_pretrained,
    'VGG16_Not_Pretrained': vgg16_not_pretrained
}

results = {}

for model_name, model in models_to_train.items():
    print(f"Training {model_name}...")
    train_time = train_model(model, train_loader, val_loader)
    accuracy = evaluate_model(model, val_loader)
    inference_time = measure_inference_time(model, val_loader)
    results[model_name] = (train_time, accuracy, inference_time)

# Visualization
for model_name, (train_time, accuracy, inference_time) in results.items():
    print(f"{model_name} - Training Time: {train_time:.2f}s, Accuracy: {accuracy:.2f}%, Inference Time: {inference_time:.2f}s")