# Portfolio Personal y Profesional de Ignacio Padrón

Este repositorio contiene el código fuente de mi sitio web personal/portfolio: [ignaciopadron.es](https://ignaciopadron.es).

El proyecto está diseñado para ser desplegado de forma automática y consistente en un servidor VPS utilizando contenedores Docker.

## 🚀 Arquitectura y Tecnologías

El sitio web es una aplicación frontend estática construida con tecnologías web estándar:

-   **HTML5**: Estructura semántica del sitio.
-   **CSS3**: Estilos y diseño responsivo (mobile-first).
-   **JavaScript (Vanilla)**: Interactividad, animaciones y lógica del cliente.
-   **Chart.js**: Visualización de habilidades mediante gráficos dinámicos.
-   **Font Awesome**: Iconos vectoriales.
-   **Formspree**: Gestión del formulario de contacto sin necesidad de un backend propio.

El despliegue se gestiona a través de un flujo de CI/CD con **GitHub Actions** y **Docker**.

## 🔧 Despliegue Automatizado (CI/CD)

El proceso de despliegue está completamente automatizado utilizando GitHub Actions y Docker.

### Flujo de Despliegue

1.  **Activador**: Cualquier `git push` a la rama `master`.
2.  **Workflow** (`.github/workflows/deploy.yml`):
    
    **Etapa 1: Build y Push**
    - El runner de GitHub Actions hace *checkout* del repositorio
    - Configura Docker Buildx para construcción multi-plataforma
    - Autentica con Docker Hub usando secrets del repositorio
    - Construye la imagen Docker usando el `Dockerfile`
    - Ejecuta escaneo de vulnerabilidades con Trivy
    - Sube la imagen a Docker Hub como `username/ignaciopadron-portfolio:latest`
    
    **Etapa 2: Despliegue**
    - Se conecta al servidor VPS via SSH
    - Descarga la imagen actualizada desde Docker Hub
    - Detiene y elimina el contenedor anterior
    - Inicia un nuevo contenedor con la imagen actualizada
    - Configura el contenedor para reiniciarse automáticamente

### Seguridad

- **Escaneo de Vulnerabilidades**: Trivy analiza la imagen Docker antes del despliegue
- **Secrets Seguros**: Credenciales almacenadas en GitHub Secrets
- **Imagen Base Segura**: Usa `nginx:stable-alpine` con las últimas correcciones de seguridad

### Resultado

Los cambios en el código se reflejan en el sitio web de forma inmediata tras el `push`, con un proceso completamente containerizado y seguro.

## 📁 Estructura del Proyecto

```
/
├── .github/                 # Workflows de GitHub Actions (CI/CD)
│   └── workflows/
│       └── deploy.yml       # Definición del trabajo de despliegue
├── website/                 # Código fuente del frontend
│   ├── index.html           # Página principal
│   ├── style.css            # Hoja de estilos
│   ├── script.js            # Lógica de JavaScript
│   └── img/                 # Recursos gráficos
├── Dockerfile               # Configuración de la imagen Docker
└── README.md                # Este archivo
```

## 🐳 Docker

El proyecto utiliza un Dockerfile multi-etapa para optimizar el tamaño de la imagen:

- **Etapa Builder**: Copia los archivos estáticos desde Alpine Linux
- **Etapa Producción**: Usa `nginx:stable-alpine` para servir el contenido
- **Optimización**: Imagen final ligera (~40MB) y segura

### Comandos Docker Locales

```bash
# Construir la imagen localmente
docker build -t ignaciopadron-portfolio .

# Ejecutar el contenedor localmente
docker run -d -p 80:80 --name portfolio ignaciopadron-portfolio

# Ver logs del contenedor
docker logs portfolio
```