---
layout: "../../layouts/CheatsheetLayout.astro"
title: "Docker Quick Reference"
description: "Containers, images, and docker-compose commands for rapid deployment."
---

## Images

Docker images are the blueprints for containers.

| Command | Description |
|---------|-------------|
| `docker build -t <name> .` | Build an image from a Dockerfile in the current directory |
| `docker images` | List all local images |
| `docker rmi <image-id>` | Remove a specific image |
| `docker pull <image>` | Download an image from Docker Hub |
| `docker push <image>` | Upload an image to a registry |

## Containers

Containers are running instances of images.

```bash
# Run a container in the background (detached mode)
docker run -d --name <container-name> <image>

# Run a container and map a port (HostPort:ContainerPort)
docker run -p 8080:80 <image>

# Run a container and map a local volume
docker run -v /local/dir:/container/dir <image>

# List all running containers
docker ps

# List ALL containers (running and stopped)
docker ps -a
```

## Managing Containers

> [!TIP]
> Use `docker exec` to run commands inside an already running container.

```bash
# Start a stopped container
docker start <container-id>

# Stop a running container gracefully
docker stop <container-id>

# Force stop a running container immediately
docker kill <container-id>

# Remove a stopped container
docker rm <container-id>

# Open an interactive bash shell inside a running container
docker exec -it <container-name> /bin/bash
```

## Docker Compose

Docker Compose is used to run multi-container applications.

```bash
# Start all services defined in docker-compose.yml in the background
docker-compose up -d

# Stop all running services
docker-compose stop

# Stop and remove all containers, networks, and volumes
docker-compose down

# View logs for all services
docker-compose logs -f
```
