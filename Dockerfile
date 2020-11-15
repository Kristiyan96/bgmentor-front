FROM node:11
WORKDIR /srv/bgmentor-front
ADD package* /srv/bgmentor-front/
RUN npm install
ADD . .
RUN npm run build --dest=dist
RUN ls

FROM nginx:latest
WORKDIR /var/www/bgmentor-front
COPY --from=0 /srv/bgmentor-front/dist/. .