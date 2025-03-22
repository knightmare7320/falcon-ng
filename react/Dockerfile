FROM node:bookworm AS build
RUN mkdir /app && chown node:node /app
USER node
WORKDIR /app
COPY --chown=node:node package.json .
RUN npm install
COPY --chown=node:node . .
EXPOSE 5173
CMD npm run dev
