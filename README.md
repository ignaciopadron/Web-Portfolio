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
- **Docker & Docker Compose**: Contenerización del servidor web Nginx para un entorno aislado y portable.
- **Nginx**: Servidor web ligero para servir el contenido estático.
- **Ansible**: Automatización de la configuración del servidor (hardening, instalación de Docker) y del despliegue de la aplicación.
- **GitHub Actions**: Orquestador de CI/CD para el despliegue automático en el servidor tras un `push` a la rama `master`.
- **UFW & Fail2Ban**: Securización básica del servidor.

## 🔧 Despliegue Automatizado (CI/CD)

El despliegue está 100% automatizado mediante un flujo de trabajo de GitHub Actions.

1.  **Activador (Trigger)**: Cualquier `push` a la rama `master` inicia el workflow.
2.  **Proceso de CI/CD**:
    - Un runner de GitHub se conecta de forma segura al servidor VPS mediante SSH.
    - Navega al directorio del proyecto (`/srv/portfolio/website`).
    - Ejecuta `git pull` para descargar la última versión del código.
3.  **Resultado**: Los nuevos cambios se publican instantáneamente, ya que Nginx sirve los archivos desde un volumen montado que refleja el repositorio.

No es necesaria ninguna intervención manual en el servidor para actualizar la web.

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
│   │   └── main.yml         # Variables de configuración
│   ├── deploy.yaml          # Playbook para desplegar Docker y la app
│   ├── hosts.ini            # Inventario de hosts (servidor VPS)
│   └── playbook.yaml        # Playbook para securizar y configurar el servidor
├── website/                 # Código fuente del frontend
│   ├── index.html           # Página principal
│   ├── style.css            # Hoja de estilos
│   └── script.js            # Lógica de JavaScript
└── README.md                # Este archivo
```

## 📝 Licencia

Este proyecto está bajo la licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

- **Email**: [ignaciopadrond@gmail.com](mailto:ignaciopadrond@gmail.com)
- **LinkedIn**: [linkedin.com/in/ignaciopadron](https://www.linkedin.com/in/ignaciopadron/)
- **GitHub**: [github.com/ignaciopadron](https://github.com/ignaciopadron)

---

Desarrollado con ❤️ por Ignacio Padrón 