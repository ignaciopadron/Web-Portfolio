# Portfolio Personal y Profesional de Ignacio Padrón

Este repositorio contiene el código fuente de mi sitio web personal/portfolio: [ignaciopadron.es](https://ignaciopadron.es).

El proyecto está diseñado para ser desplegado de forma automática y consistente en un servidor VPS.

## 🚀 Arquitectura y Tecnologías

El sitio web es una aplicación frontend estática construida con tecnologías web estándar:

-   **HTML5**: Estructura semántica del sitio.
-   **CSS3**: Estilos y diseño responsivo (mobile-first).
-   **JavaScript (Vanilla)**: Interactividad, animaciones y lógica del cliente.
-   **Chart.js**: Visualización de habilidades mediante gráficos dinámicos.
-   **Font Awesome**: Iconos vectoriales.
-   **Formspree**: Gestión del formulario de contacto sin necesidad de un backend propio.

El despliegue se gestiona a través de un flujo de CI/CD con **GitHub Actions**.

## 🔧 Despliegue Automatizado (CI/CD)

El proceso de despliegue está completamente automatizado utilizando GitHub Actions.

1.  **Activador**: Cualquier `git push` a la rama `master`.
2.  **Workflow** (`.github/workflows/deploy.yml`):
    1.  El runner de GitHub Actions hace *checkout* del repositorio.
    2.  Utiliza la acción `easingthemes/ssh-deploy`, que encapsula **`rsync`**, para sincronizar el contenido de la carpeta `website/` con el directorio de destino en el servidor (`/srv/portfolio/website`).
    3.  La conexión SSH se autentica mediante una clave privada almacenada de forma segura en los *Secrets* del repositorio.
    4.  La opción `--delete` de `rsync` asegura que el directorio en el servidor sea un espejo exacto del contenido de la carpeta `website/` en el repositorio.
3.  **Resultado**: Los cambios en HTML, CSS o JavaScript se reflejan en el sitio web de forma inmediata tras el `push`.

Este enfoque garantiza que el código fuente se mantenga como la única fuente de verdad y que los despliegues sean rápidos, seguros y consistentes.

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
└── README.md                # Este archivo
```