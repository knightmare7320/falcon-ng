FROM node:current-alpine
WORKDIR /app
COPY src/package.json .
RUN npm install
COPY src/. .
# this next line won't work like this here, but maybe figure something out, or just stick the entire contents into the mysql/mysql-dump directory
#cat ./db/*.sql | mysql 
EXPOSE 80
CMD [ "npm", "start"]