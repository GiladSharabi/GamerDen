#React app image
FROM node:lts-alpine as build

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_API_ENDPOINT="http://localhost:8080/api"

RUN npm run build

FROM nginx:latest as prod

COPY --from=build /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80/tcp

CMD ["/usr/sbin/nginx", "-g", "daemon off;"]