FROM node:bookworm
RUN apt-get update && apt-get upgrade -y

# ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node src/package.json .
# RUN npm install ci --only=production
RUN npm install
COPY --chown=node:node src .
# COPY --chown=node:node pictures /data/pictures
EXPOSE 8000
CMD npm start
