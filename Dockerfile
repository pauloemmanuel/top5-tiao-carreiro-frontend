FROM node:20-alpine as build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN set -eux; \
  if [ -f .env ]; then \
  cp .env .env.production; \
  else \
  : > .env.production; \
  fi

RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
