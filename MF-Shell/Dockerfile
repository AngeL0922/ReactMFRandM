FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG CHARACTERS_URL
ARG DETAIL_URL
ENV CHARACTERS_URL=$CHARACTERS_URL
ENV DETAIL_URL=$DETAIL_URL

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80