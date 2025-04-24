FROM node:23-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y wget

RUN npm install -g npm@latest

EXPOSE 3000

CMD [ "./run.sh" ]
