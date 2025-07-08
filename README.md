# Portfolio Personal y Profesional de Ignacio Padrón

Este repositorio contiene toda la infraestructura como código (IaC) y el código fuente de mi sitio web personal/portfolio: [ignaciopadron.es](https://ignaciopadron.es).

El proyecto está diseñado para ser desplegado de forma automática y consistente sobre un servidor VPS, utilizando Docker para la contenedorización y Ansible para la configuración y el despliegue.

## 🚀 Arquitectura y Tecnologías

Este proyecto se divide en dos componentes principales: la **aplicación web** y la **infraestructura de despliegue**.

#### **Website (El Frontend)**
- **HTML5**: Estructura semántica del sitio.
- **CSS3**: Estilos y diseño responsivo (mobile-first).
- **JavaScript (Vanilla)**: Interactividad, animaciones y lógica del cliente.
- **Chart.js**: Visualización de habilidades mediante gráficos dinámicos.
- **Font Awesome**: Iconos vectoriales.
- **Formspree**: Gestión del formulario de contacto sin backend propio.

#### **Infraestructura (DevOps/IaC)**
- **Docker & Docker Compose**: Contenerización de los servicios.
- **Nginx Proxy Manager**: Termina TLS, gestiona certificados y reenvía el tráfico al contenedor de la web.
- **Nginx (alpine)**: Contenedor ultraligero que sirve los ficheros estáticos.
- **Ansible**: Provisiona el VPS (paquetes, Docker, carpetas, `docker-compose.yml`) de forma idempotente.
- **GitHub Actions**: Sincroniza la carpeta `website/` con el servidor mediante **`rsync`** en cada `push` a `master` (flujo CI/CD).
- **UFW & Fail2Ban**: Capa básica de firewall y anti-bruteforce.

## 🔧 Despliegue Automatizado (CI/CD)

1.  **Trigger**: cualquier `git push` a la rama `master`.
2.  **Workflow** (`.github/workflows/deploy.yml`):
    1. El runner hace *checkout* del repositorio.
    2. Usa la acción `easingthemes/ssh-deploy` que encapsula **`rsync`** para copiar **solo** la carpeta `website/` al VPS (`/srv/portfolio/website`). Se usan claves SSH almacenadas como *Secrets*.
    3. La opción `--delete` de rsync mantiene el directorio de destino como espejo exacto del repositorio.
3.  **Resultado**: los cambios de HTML/CSS/JS están disponibles de inmediato; Nginx los sirve sin reiniciar contenedores.

La infraestructura (contenedores, firewall, etc.) solo se gestiona con Ansible; el código se entrega vía CI/CD.

## 📁 Estructura del Proyecto

```
/
├── .github/                 # Workflows de GitHub Actions (CI/CD)
│   └── workflows/
│       └── deploy.yml       # Definición del trabajo de despliegue
├── ansible/                 # Playbooks de Ansible para IaC
│   ├── templates/
│   │   └── docker-compose.yml.j2 # Plantilla de Docker Compose
│   ├── vars/
│   │   └── secrets.yml      # Variables sensibles cifradas con Ansible Vault
│   ├── deploy.yaml          # Playbook para desplegar Docker y la app
│   ├── hosts.ini            # Inventario de hosts (servidor VPS)
│   └── playbook.yaml        # Playbook para securizar y configurar el servidor
├── website/                 # Código fuente del frontend
│   ├── index.html           # Página principal
│   ├── style.css            # Hoja de estilos
│   └── script.js            # Lógica de JavaScript
└── README.md                # Este archivo
```