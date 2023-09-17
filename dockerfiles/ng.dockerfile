FROM node
# RUN addgroup --gid 1001 nodegroup && adduser --group nodegroup --shell /bin/sh nodeuser
# USER nodeuser
WORKDIR /var/www/html
RUN npm install -g @angular/cli
ENTRYPOINT [ "ng" ]