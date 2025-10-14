# --- Etapa 1: Builder ---
# Usamos una imagen base ligera para copiar los archivos fuente.
# Esto nos permite aislar los archivos que queremos en la imagen final.
FROM alpine:latest AS builder

# Establecemos el directorio de trabajo dentro de la imagen
WORKDIR /app

# Copiamos el contenido de la carpeta 'website' a la etapa 'builder'
COPY ./website/ .

# --- Etapa 2: Producción ---
# Usamos la imagen más reciente y estable de Nginx basada en Alpine
FROM nginx:stable-alpine

RUN apk update && apk upgrade

# Copiamos los archivos estáticos desde la etapa 'builder' al directorio web de Nginx.
COPY --from=builder /app /usr/share/nginx/html

# Exponemos el puerto 80 para que el servidor Nginx pueda recibir tráfico HTTP.
EXPOSE 80

# El comando por defecto de la imagen base de Nginx (`nginx -g 'daemon off;'`) se encargará de iniciar el servidor.