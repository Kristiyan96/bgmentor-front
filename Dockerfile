FROM node:11
WORKDIR /srv/vue-ui
ADD package*.json ./
RUN npm install
ADD . .
RUN npm run build --dest=dist

FROM nginx:alpine as production-build
WORKDIR /var/www/vue-ui
COPY --from=0 /srv/vue-ui/dist/. .