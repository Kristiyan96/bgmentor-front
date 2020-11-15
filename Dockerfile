FROM node:11
WORKDIR /vue-ui
ADD package*.json ./
RUN npm install
ADD . .
RUN npm run build --dest=dist

FROM nginx:alpine as production-build
ADD ./.nginx/nginx.conf /etc/nginx

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=0 /vue-ui/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
