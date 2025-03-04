# Usa una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos de tu proyecto al contenedor
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]