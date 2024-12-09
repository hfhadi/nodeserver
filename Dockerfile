FROM node:14
WORKDIR ./
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["node", "main.js"]