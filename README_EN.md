# Personal and Professional Portfolio of Ignacio Padrón

[🇪🇸 Español](README.md) | [🇺🇸 English](README_EN.md)

This repository contains the source code of my personal/professional website: [ignaciopadron.es](https://ignaciopadron.es).

The project is designed to be deployed automatically and consistently on a VPS server using Docker containers.

## 🚀 Architecture and Technologies

The website is a static frontend application built with standard web technologies:

-   **HTML5**: Semantic structure of the site.
-   **CSS3**: Responsive styles and design (mobile-first).
-   **JavaScript (Vanilla)**: Interactivity, animations and client-side logic.
-   **Chart.js**: Skills visualization through dynamic charts.
-   **Font Awesome**: Vector icons.
-   **Formspree**: Contact form management without needing a custom backend.

Deployment is managed through a CI/CD pipeline with **GitHub Actions** and **Docker**.

## 🔧 Automated Deployment (CI/CD)

The deployment process is completely automated using GitHub Actions and Docker.

### Deployment Flow

1.  **Trigger**: Any `git push` to the `master` branch.
2.  **Workflow** (`.github/workflows/deploy.yml`):
    
    **Stage 1: Build and Push**
    - GitHub Actions runner checks out the repository
    - Configures Docker Buildx for multi-platform builds
    - Authenticates with Docker Hub using repository secrets
    - Builds the Docker image using the `Dockerfile`
    - Runs vulnerability scanning with Trivy
    - Pushes the image to Docker Hub as `username/ignaciopadron-portfolio:latest`
    
    **Stage 2: Deployment**
    - Connects to the VPS server via SSH
    - Downloads the updated image from Docker Hub
    - Stops and removes the previous container
    - Starts a new container with the updated image
    - Configures the container to restart automatically

### Security

- **Vulnerability Scanning**: Trivy analyzes the Docker image before deployment
- **Secure Secrets**: Credentials stored in GitHub Secrets
- **Secure Base Image**: Uses `nginx:stable-alpine` with the latest security patches

### Result

Code changes are reflected on the website immediately after the `push`, with a completely containerized and secure process.

## 📁 Project Structure

```
/
├── .github/                 # GitHub Actions workflows (CI/CD)
│   └── workflows/
│       └── deploy.yml       # Deployment job definition
├── website/                 # Frontend source code
│   ├── index.html           # Main page
│   ├── style.css            # Stylesheet
│   ├── script.js            # JavaScript logic
│   └── img/                 # Graphic resources
├── Dockerfile               # Docker image configuration
└── README.md                # This file
```

## 🐳 Docker

The project uses a multi-stage Dockerfile to optimize image size:

- **Builder Stage**: Copies static files from Alpine Linux
- **Production Stage**: Uses `nginx:stable-alpine` to serve content
- **Optimization**: Light (~40MB) and secure final image

### Local Docker Commands

```bash
# Build the image locally
docker build -t ignaciopadron-portfolio .

# Run the container locally
docker run -d -p 80:80 --name portfolio ignaciopadron-portfolio

# View container logs
docker logs portfolio
``` 