# Iris Node

A node for Iris Network

## Usage

### With Docker

```shell
docker build -t iris-node .
docker run -itd -v /var/run/docker.sock:/var/run/docker.sock iris-node
```

### With Docker Compose

```
version: "3"

services:

  node:
    image: iris-node
    container_name: iris-node
    build: ./node
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - 8080:8080
      - 8081:8081
    stdin_open: true
    tty: true
    environment:
      - NAME=RedServer
      - IP=red.ryx.be
      - API=8080
      - SOCKET=8081
      - PASSWORD=ApiPassword
```

```shell
docker-compose build
docker-compose up -d
```

### Directly

```shell
npm run build
npm start -- --name MyNode --ip 1.2.3.4 --api 8080 --socket 8081 --password "ApiPassword"
```
