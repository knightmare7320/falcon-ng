FROM node:23-bookworm
RUN apt-get update && apt-get upgrade -y

# ENV NODE_ENV production
RUN mkdir /app && chown node:node /app
WORKDIR /app
USER node
COPY --chown=node:node src/package.json .
# RUN npm install ci --only=production
RUN npm install
COPY --chown=node:node src .
EXPOSE 8000
CMD npm start
