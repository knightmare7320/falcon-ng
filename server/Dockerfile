FROM node
WORKDIR /app
COPY src/package.json .
RUN npm install
COPY src/. .
EXPOSE 80
CMD [ "npm", "start"]