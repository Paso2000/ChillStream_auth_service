# Usa un'immagine Node.js ufficiale
FROM node:18

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file del progetto
COPY package.json package-lock.json ./
RUN npm install


# Copia il resto del codice sorgente
COPY . .

# Espone la porta
EXPOSE 8081

# Comando di avvio
CMD ["npm", "start"]
