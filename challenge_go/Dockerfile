FROM golang:1.24-alpine

WORKDIR /app

COPY . .

#CMD [ "tail", "-f", "/dev/null" ]
CMD [ "go", "run", "cmd/app/main.go" ]
