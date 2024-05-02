FROM node:alpine3.19
ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node src/package.json .
RUN npm install ci --only=production
COPY --chown=node:node src .
EXPOSE 80
CMD npm start
