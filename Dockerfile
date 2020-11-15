FROM node:11
WORKDIR /vue-ui
ADD package*.json ./
RUN npm install
ADD . .
RUN npm run build

FROM nginx:latest
WORKDIR /var/www/bgmentor-front
COPY --from=builder /srv/bgmentor-front/dist/. .