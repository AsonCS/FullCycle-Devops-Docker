# Challenge Nginx with Node (Full Cycle 3.0 Course)

### Web localhost:8080

<img alt="Command output" src="web.png" />

### docker-compose.yaml

```yaml
services:
    app:
        build:
            context: node
        container_name: app
        networks:
            - nginx_node
        volumes:
            - ./node:/usr/src/app
        tty: true
        depends_on:
            db:
                condition: service_started
        ports:
            - '3000:3000'

    db:
        image: mysql:5.7
        container_name: db
        command: --innodb-use-native-aio=0
        restart: always
        tty: true
        volumes:
            - ./mysql:/var/lib/mysql
        environment:
            - MYSQL_DATABASE=nodedb
            - MYSQL_ROOT_PASSWORD=root
        networks:
            - nginx_node

    nginx:
        build:
            context: nginx
        container_name: nginx
        depends_on:
            app:
                condition: service_started
        networks:
            - nginx_node
        ports:
            - '8080:80'

networks:
    nginx_node:
        driver: bridge
```

### nginx.conf

```conf
server {
    listen "80";

    add_header "X-Frame-Options" "SAMEORIGIN";
    add_header "X-XSS-Protection" "1; mode=block";
    add_header "X-Content-Type-Options" "nosniff";

    charset "utf-8";

    location / {
        proxy_pass "http://app:3000";
    }
}
```

### Node files

1. [service.js](node/service.js)
    - Database's code
2. [index.js](node/index.js)
    - Application script
