FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run generate

EXPOSE 5000
CMD ["npm", "start"]
