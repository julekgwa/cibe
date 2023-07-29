FROM --platform=linux/arm64/v8 node:16-alpine3.18

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 8083

ENV ADDRESS=0.0.0.0 PORT=8083

CMD [ "npm", "start" ]