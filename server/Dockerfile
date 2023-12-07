# Use an NVIDIA CUDA base image
FROM nvidia/cuda:11.6.0-base-ubuntu20.04

# Install Miniconda
ENV MINICONDA_VERSION latest
ENV CONDA_DIR /opt/conda
ENV PATH $CONDA_DIR/bin:$PATH

RUN apt-get update && apt-get install -y wget && \
    wget https://repo.anaconda.com/miniconda/Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh && \
    bash Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh -b -p $CONDA_DIR && \
    rm Miniconda3-${MINICONDA_VERSION}-Linux-x86_64.sh

# Copy your environment.yml (assumed to be in the same directory as the Dockerfile)
COPY environment.yml /tmp/environment.yml

# Create the environment:
RUN conda env create -f /tmp/environment.yml

# Make RUN commands use the new environment:
SHELL ["conda", "run", "-n", "pspc", "/bin/bash", "-c"]

# The code to run when container is started:
COPY . /app
WORKDIR /app
