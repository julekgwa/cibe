#!/bin/bash

docker-compose up --scale api=3 -d --build --force-recreate