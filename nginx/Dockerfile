# FROM node:current-alpine AS build
# WORKDIR /app
# COPY ../react/package.json .
# RUN npm install
# COPY ../react .
# CMD npm run build

FROM nginx:stable-alpine
EXPOSE 8000
WORKDIR /etc/nginx/conf.d
COPY nginx.conf .
RUN mv nginx.conf default.conf
# COPY --from=build /app/dist /var/www/html