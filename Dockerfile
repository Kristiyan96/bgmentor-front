FROM node:11
WORKDIR /srv/vue-ui
ADD package*.json ./
RUN npm install
ADD . .
RUN npm run build --dest=dist

FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY --from=0 /srv/vue-ui/dist/. .