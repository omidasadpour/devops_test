FROM node:14.18.3-alpine3.15 as base
RUN apk add bash curl #convenience packages
RUN mkdir /app && chown -R node /app
USER node
COPY --chown=node . /app
WORKDIR /app
RUN ls -al
RUN npm ci --no-package-lock
RUN npm run build
ENTRYPOINT ["npm","run", "start:prod"]
