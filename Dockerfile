# Usar la imagen base de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación Angular
COPY . .

# Exponer el puerto 4200
EXPOSE 4200

# Comando para ejecutar el servidor de desarrollo de Angular
ENTRYPOINT  ["npm", "start"]
