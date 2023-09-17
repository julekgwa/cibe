# Automate Deployment using CircleCI and Docker

## Install Docker and Docker compose

SSH into your VM/VPS and run the following commands

```sh
sudo dnf install -y dnf-utils zip unzip
sudo dnf config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf remove -y runc
# install docker
sudo dnf install -y docker-ce --nobest
```

Enable and start Docker
```sh
sudo systemctl enable --now docker.service
```
## Create a new user for deployment

Create a new user that doesn't use password to login
```sh
sudo useradd -m -d /home/circleci -s /bin/bash circleci
```

Create an SSH key, which the new user can use to log in

```sh
ssh-keygen -m PEM -t rsa -f .ssh/circleci
```
Create a ```.ssh``` directory for the ```circleci``` user:

```sh
sudo mkdir /home/circleci/.ssh
```
Give the ```circleci``` user its directory permissions so that it doesn’t run into permission issues during deployment.

```sh
sudo chown -R circleci:circleci /home/circleci
```

## Docker Commands as Non-Root User
```sh
echo "circleci  ALL=(ALL)  NOPASSWD: /usr/bin/docker" | sudo tee -a /etc/sudoers
echo "alias docker=\"sudo /usr/bin/docker\"" | sudo tee -a /home/circleci/.bash_profile
```

## Add SSH Key to CircleCI

```sh
cat ~/.ssh/circleci
```
Copy the output. In CircleCI select your project -> click Project settings -> select SSH Keys -> Paste the output in the private key text box.

## Create deployment script

cd  ```/home/circleci``` and create deploy.sh file, CircleCI will run this script every time we push changes to Github.

```sh
vi deploy.sh
```
 and enter the following
```sh
#!/bin/bash
# Runs docker compose
docker compose up --scale api=3 -d --build --force-recreate
```

## Create docker-compose.yml file

```sh
vi docker-compose.yml
```

and paste the following

```yml
version: "3.8"
services:
  api:
    restart: always
    build:
      context: https://${TOKEN}@github.com/julekgwa/cibe.git#main
      dockerfile: Dockerfile
    ports:
      - "8083-8085:8083"
    environment:
      MONGODB_URI: mongodb://db/movies
  db:
    restart: always
    image: mongo
    volumes:
      - movies:/data/db

volumes:
  movies:
```

## Add Your GitHub Project to CircleCI
https://circleci.com/docs/getting-started/

## Update the ```config.yml``` in ```.circleci```

Add environment variables to your project in CircleCI, ```PORT```, ```USER``` and ```IP```

```yml
jobs:
  pull-and-build:
    docker:
      - image: arvindr226/alpine-ssh
    steps:
      - checkout
      - run: ssh -p $PORT -oStrictHostKeyChecking=no -v $USER@$IP "./deploy.sh"

# Orchestrate our job run sequence
workflows:
  version: 2
  build-project:
    jobs:
      - pull-and-build:
          filters:
            branches:
              only:
                - main
```

## Adding ```nginx``` proxy

```sh
# Install nginx
sudo dnf install nginx
# Enable and start nginx server
sudo systemctl enable --now nginx
```

```conf
upstream appservers {
  server 127.0.0.1:8083;
  server 127.0.0.1:8084;
  server 127.0.0.1:8085;
}

server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  _;
        root         /usr/share/nginx/html;

        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;

   location / {
       client_max_body_size 100M;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header Host $http_host;
        proxy_pass http://appservers;
        proxy_redirect off;
   }

}
```

## Troubleshooting

You might get permission denied when running docker compose from CircleCI. To fix the issue change the permissions for ```/var/run/docker.sock```

```sh
sudo chmod 666 /var/run/docker.sock
```
