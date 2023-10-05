FROM node:current-alpine AS build
WORKDIR /app
# RUN npm install -g @angular/cli
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --prod
EXPOSE 4200
CMD [ "npm", "start"]

# FROM nginx:latest AS ngi
# COPY --from=build /app/dist/falcon /usr/share/nginx/html
# COPY /nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80