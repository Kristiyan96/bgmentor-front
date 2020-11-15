FROM node:11
RUN mkdir /bgmentor-front

WORKDIR /bgmentor-front

COPY package.json /bgmentor-front
COPY package-lock.json /bgmentor-front
RUN npm install

COPY . /bgmentor-front

CMD ["npm", "serve", "--dest=dist"]

# FROM nginx:latest
# WORKDIR /var/www/bgmentor
# COPY --from=0 /srv/bgmentor/dist/. .
# COPY api-endpoint.conf /etc/nginx/conf.d/.
