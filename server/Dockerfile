FROM node:current-alpine
# ENV NODE_ENV production
USER node
WORKDIR /app
COPY --chown=node:node src/package.json .
# RUN npm install ci --only=production
RUN npm install
COPY --chown=node:node src .
EXPOSE 80
CMD npm start
