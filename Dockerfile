FROM node:14
COPY package*.json ./
RUN npm install
EXPOSE 3000
CMD ["node", "main.js"]