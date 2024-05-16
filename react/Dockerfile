FROM node:current-alpine AS build
# USER node
WORKDIR /app
COPY --chown=node:node package.json .
RUN npm install
COPY --chown=node:node . .
EXPOSE 5173
CMD npm run dev
