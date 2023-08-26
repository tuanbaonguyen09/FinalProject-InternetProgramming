FROM node:20-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "index.js" ]

#docker build --tag node-docker .
# docker run -p 8080:8080 -d node-docker