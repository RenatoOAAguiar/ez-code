#/bin/bash


docker network create app-network
docker-compose build
docker-compose up