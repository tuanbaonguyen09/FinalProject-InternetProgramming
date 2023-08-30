# Final Project - Internet Programming 
## Object Detection Website
### 2012667 - Nguyen Hoang Tuan Bao
Roboflow model - SERN

## Docker
My projects are running using these ports:
| Container | Port |
| ------ | ------ |
| Database | 3307 |
| Frontend (client) | 8080 |
| Backend (server) | 5000 |
### How to run (from dockerhub)
```sh
docker compose -f "docker-compose.yaml" up -d --build 
```
### How to run (from source)
```sh
cd docker
docker compose -f "docker-compose.yaml" up -d --build 
```
Please wait for 30 to 40 seconds for the database to start successfully. After that, my backend and frontend will auto-start.
Once all the containers are running, you can access port 8080 from localhost to start the application.

