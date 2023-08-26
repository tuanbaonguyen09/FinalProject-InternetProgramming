FROM node:20-alpine
# FROM nginx:1.23.3

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8080

EXPOSE 3000

RUN npm run build

CMD ["npm","run", "start"]