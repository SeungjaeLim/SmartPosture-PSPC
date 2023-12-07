# Define Docker image names
CUDA_IMAGE_NAME := cuda-conda-app
REACT_IMAGE_NAME := react-app

# Define Dockerfile locations
CUDA_DOCKERFILE := ./server/Dockerfile
REACT_DOCKERFILE := ./web/Dockerfile

# Define any necessary ports for the React app
REACT_PORT := 3000

# Build the CUDA/Conda Docker image
build-cuda:
	docker build -f $(CUDA_DOCKERFILE) -t $(CUDA_IMAGE_NAME) ./server

# Run the CUDA/Conda container
run-cuda:
	docker run --gpus all -it $(CUDA_IMAGE_NAME)

# Build the React Docker image
build-react:
	docker build -f $(REACT_DOCKERFILE) -t $(REACT_IMAGE_NAME) ./web

# Run the React container
run-react:
	docker run -p $(REACT_PORT):80 -d $(REACT_IMAGE_NAME)

.PHONY: build-cuda run-cuda build-react run-react
