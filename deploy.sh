#!/bin/bash

# #replace this with the path of your project on the VPS
# cd ~/circleci-test

# #pull from the branch
# git pull origin main

# # followed by instructions specific to your project that you used to do manually
# npm install
# export PATH=~/.npm-global/bin:$PATH
# source ~/.profile

# pm2 restart app
docker compose up -d --build --force-recreate