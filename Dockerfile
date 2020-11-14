FROM node:11
WORKDIR /srv/bgmentor
ADD package* /srv/bgmentor/
RUN npm install
ADD . .
RUN npm run build --dest=dist
RUN ls

FROM nginx:latest
WORKDIR /var/www/bgmentor
COPY --from=0 /srv/bgmentor/dist/. .
COPY api-endpoint.conf /etc/nginx/conf.d/.
