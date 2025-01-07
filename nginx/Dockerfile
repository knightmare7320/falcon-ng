# FROM node:current-alpine AS build
# WORKDIR /app
# COPY ../react/package.json .
# RUN npm install
# COPY ../react .
# CMD npm run build

FROM nginx:bookworm
EXPOSE 8000

RUN apt-get update && apt-get upgrade -y

WORKDIR /app
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginx:nginx /app && \
    chmod -R 755 /app && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# COPY --from=build /app/dist /var/www/html