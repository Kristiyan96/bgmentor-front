FROM node:11
WORKDIR /vue-ui
ADD package*.json ./
RUN npm install
ADD . .
RUN npm run build

FROM nginx:alpine as production-build

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /vue-ui/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]