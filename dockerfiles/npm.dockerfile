FROM node
# RUN addgroup -g 1000 node && adduser -G node -g node -s /bin/sh -D node
# USER node
WORKDIR /var/www/html
ENTRYPOINT [ "npm" ]
