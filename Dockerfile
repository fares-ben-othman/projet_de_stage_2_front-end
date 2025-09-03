# --------------------------
# Étape 1 : Build Angular
# --------------------------
FROM node:18.20.8 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire le projet Angular pour production
RUN npm run build --prod

# --------------------------
# Étape 2 : Servir avec Nginx
# --------------------------
FROM nginx:alpine

# Copier les fichiers construits depuis l'étape build
COPY --from=build /app/dist/front-end /usr/share/nginx/html

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80
EXPOSE 80

# Lancer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
