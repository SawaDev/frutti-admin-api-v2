# STAGE 1
FROM node:16-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000
CMD ["node","dist/bin/www.js"]
