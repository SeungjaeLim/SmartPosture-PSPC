# PSPC
SmartPosture: Personalized Study Posture Care
<img src="https://img.shields.io/badge/NGINX-009639?style=flat-square&logo=NGINX&logoColor=white"/> <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=OpenCV&logoColor=white"/> <img src="https://img.shields.io/badge/PyMODI-007396?style=flat-square&logoColor=white"/> <!-- No official PyMODI logo available --> <img src="https://img.shields.io/badge/CUDA-76B900?style=flat-square&logo=NVIDIA&logoColor=white"/> <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=PyTorch&logoColor=white"/> <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=FastAPI&logoColor=white"/> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white"/> <img src="https://img.shields.io/badge/LangChain-007396?style=flat-square&logoColor=white"/> <!-- No official LangChain logo available --> <img src="https://img.shields.io/badge/OpenAI_API-412991?style=flat-square&logo=OpenAI&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/Github_Pages-222222?style=flat-square&logo=GitHub&logoColor=white"/>




## Purpose
SmartPosture is designed to provide personalized posture care for individuals during their study sessions. The application monitors, records, and advises users on maintaining correct posture, enhancing their overall well-being and productivity.

## Development Environment

![coe drawio (4)](https://github.com/SeungjaeLim/PSPC/assets/74184274/4de4f294-830e-4bc8-89bc-0740f79dcb37)


### Backend Environment
- **NGINX**: Used as a web server and a reverse proxy to manage and direct web traffic.
- **OpenCV**: Integrated for image processing and posture recognition.
- **PyMODI**: Utilized for interacting with MODI modules, enabling IoT capabilities.
- **CUDA with 1x RTX 2080**: Leverages NVIDIA's CUDA technology for accelerated computing tasks, essential for efficient deep learning operations.
- **PyTorch**: The primary machine learning framework, used for developing and training posture analysis models.
- **FastAPI**: A modern, fast web framework for building APIs with Python. Provides the backbone for the server-side logic.
- **Docker**: Used for containerizing the application, ensuring consistency across different environments.
- **LangChain**: Integrated for building advanced language models and chat functionalities.
- **OpenAI API**: Employed for advanced AI and language processing features.
- **MySQL**: The relational database management system used for storing and managing application data.

### Frontend Environment
- **React**: The core framework for building the user interface of the web application.
- **Github Pages**: Used for hosting and deploying the front-end of the application.



### ./Makefile
- **Description**: Makefile for project

## Backend Directory: `./server`

### Dockerfile
- **Description**: Dockerfile for setting up an environment with CUDA 11.6, ideal for applications requiring CUDA support.

### environment.yml
- **Description**: A conda environment file listing all necessary dependencies, ensuring a consistent setup across environments.

### account_api.py
- **Description**: Defines FastAPI routes for user account management, including login and registration.
- **Key Endpoints**:
  - `/login`: Authenticates a user based on database credentials.
  - `/register`: Registers a new user, checking for existing users and adding new entries to the database.

### chat.py
- **Description**: Manages chat functionalities using the `langchain` library, focusing on generating responses with OpenAI's GPT models.
- **Key Function**: 
  - `llm_advice`: Sets up a chat scenario for posture advice using language models.

### db.py
- **Description**: Manages database connectivity, using `mysql.connector` to establish connections to a MySQL database.
- **Key Function**:
  - `get_db_connection`: Creates and returns a connection to the MySQL database.

### main.py
- **Description**: The entry point for the FastAPI application, setting up CORS middleware, and integrating various routers.
- **Key Features**:
  - CORS middleware for frontend interaction.
  - Integration of routers from `api`, `account_api`, and `study_api`.

### model.py
![image](https://github.com/SeungjaeLim/PSPC/assets/74184274/00f6f6c8-ec36-490a-a4ba-7a22a5bb0ca5)
- **Description**: This file hosts the `PostureModel` class, which leverages a deep learning model for posture analysis in images. It employs the ResNet18 model, a renowned convolutional neural network, pre-trained on the ImageNet dataset. ImageNet's extensive visual database is pivotal for training deep neural networks in diverse visual recognition tasks. The ResNet18 model is chosen for its efficiency and accuracy, making it ideal for image classification tasks, such as posture analysis.
- **Key Class**: `PostureModel`
  - **Model Initialization**: Initializes the ResNet18 model with weights pre-trained on ImageNet. This pre-training aids the model in recognizing a broad array of visual features, enhancing its capability for posture classification.
  - **Fine-Tuning on Custom Dataset**: The upper layers of the model are frozen to retain the learned features from ImageNet, while the final fully connected layer is adapted to classify images into four posture-related categories ('correct', 'neck', 'shoulder', 'waist'). This approach, known as fine-tuning, allows the model to be specifically tailored to the nuances of the custom posture dataset, thereby enhancing its accuracy and relevance for posture analysis.
  - **Transformation and Inference**: Implements an image transformation pipeline for standardizing inputs (resizing and tensor conversion) and includes the `analyze_image` method for inference. This method processes input images using the model to classify the posture, returning the most probable category.
- **Usage**: 
  - Instantiate `PostureModel` and utilize the `analyze_image` method with an image input for posture classification. The use of a pre-trained and fine-tuned ResNet18 model ensures robust feature extraction and efficient learning, making the model highly effective for practical posture analysis applications.


### study_api.py
- **Description**: API router managing study-related data and functionalities, including data fetching, environmental data retrieval, posture advice, and study updates.
- **Key Endpoints**: 
  - `/study-data`: Aggregates and retrieves study data.
  - `/env`: Fetches environmental data.
  - `/advise`: Provides posture advice.
  - `/update-study`: Updates study logs and interacts with `pymodi` based on posture analysis.

### train.py
- **Description**: Script for training a CNN model for posture classification, using a pre-trained ResNet18 model and custom dataset.
- **Key Processes**: 
  - Data loading and transformation.
  - Model adaptation and training.
  - Validation and evaluation.
  - Visualization of training progress.
  - Saving the trained model.

## Frontend Directory: `./web`

### Dockerfile
- **Description**: This Dockerfile sets up the environment for the React front-end application. It details the steps to containerize the React app, ensuring a consistent setup for development and deployment.

### src/App.js
- **Description**: The central component of the React application, `App.js` orchestrates the overall layout and navigation. It integrates key components such as `LoginPage`, `StopwatchPage`, `WeeklyGrid`, and `IOTSettings`, and manages global state and routing.
![image-1](https://github.com/SeungjaeLim/PSPC/assets/74184274/b77b90ab-19b0-4e32-b498-42ae19b9f5bb)
![image-5](https://github.com/SeungjaeLim/PSPC/assets/74184274/8db7da85-00e1-4f2c-967f-5b39964e4101)

### src/LoginPage.js
- **Description**: Handles the user login interface. This component sends a POST request to the `${process.env.REACT_APP_API_URL}/login/` endpoint with the user's credentials. On successful login, it updates the application's state to reflect the user's logged-in status.
![image-2](https://github.com/SeungjaeLim/PSPC/assets/74184274/55e4f7bc-58e7-4c02-9c06-71e33db62d97)

### src/RegisterPage.js
- **Description**: Manages the user registration process. It captures user input for username, email, and password, and sends this data in a POST request to the `${process.env.REACT_APP_API_URL}/register/` endpoint. It handles both successful registrations and errors, such as when a user already exists.
![image-3](https://github.com/SeungjaeLim/PSPC/assets/74184274/8bbda575-0826-4d79-8530-ff34c52d4fee)

### src/StopwatchPage.js
- **Description**: Functions as a timer for study sessions. This component periodically sends POST requests to the `${process.env.REACT_APP_API_URL}/update-study` endpoint every 60 seconds to update the server with ongoing session data. It displays warnings based on the server's response, particularly related to the user's posture.
![image-4](https://github.com/SeungjaeLim/PSPC/assets/74184274/889947a9-c5f8-4022-a87a-827188b7600a)


### src/WeeklyGrid.js
- **Description**: Provides a visual representation of the user's weekly study data. This component uses the `studyData` prop to display a pie chart for each day's study sessions, showing the breakdown of correct and incorrect posture times. It features an interactive modal for detailed daily analysis, enhancing user engagement.

## Database: MySQL (`PSPC`)

### Database: `PSPC`
- **Usage**: This database serves as the primary data store for the application, containing user data and posture logs.

### Tables and Example Data

1. **Table: `log`**
   - **Description**: Stores logs of users' posture status.
   - **Fields**:
     - `id`: Integer (Primary Key, Auto-incremented)
     - `date`: Datetime
     - `status`: Varchar(255)
   - **Example Entry**:
     ```
     +----+---------------------+----------+
     | id | date                | status   |
     +----+---------------------+----------+
     |  1 | 2023-12-04 20:49:40 | neck     |
     |  2 | 2023-12-04 20:50:32 | shoulder |
     |  3 | 2023-12-04 20:51:14 | correct  |
     ```
   - **Purpose**: Enables tracking of user posture over time for feedback and analysis.

2. **Table: `users`**
   - **Description**: Maintains user account information.
   - **Fields**:
     - `id`: Varchar(255) (Primary Key)
     - `passwd`: Varchar(255)
     - `email`: Varchar(255)
   - **Example Entry**:
     ```
     +-------------+--------+-------------------------+
     | id          | passwd | email                   |
     +-------------+--------+-------------------------+
     | johndoe     | 1234   | john.doe@example.com    |
     | janedoe     | 1234   | jane.doe@example.com    |
     | user123     | 1234   | user123@example.com     |
     ```
   - **Purpose**: Essential for user management, handling authentication, and storing contact information.
