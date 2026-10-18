FROM node:24-alpine AS builder
WORKDIR /app


COPY package*.json ./

RUN npm install --legacy-peer-deps
COPY . .

ARG PORT=3663
ARG VITE_WHATSAPP_CHANNEL_LINK
ARG VITE_TELEGRAM_CHANNEL_LINK
ARG VITE_APP_VERSION=1.0.3

ENV EXPOSE_PORT=${PORT}
ENV VITE_WHATSAPP_CHANNEL_LINK=${VITE_WHATSAPP_CHANNEL_LINK}
ENV VITE_TELEGRAM_CHANNEL_LINK=${VITE_TELEGRAM_CHANNEL_LINK}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid && \
  chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html
USER nginx

EXPOSE ${EXPOSE_PORT}
CMD ["nginx", "-g", "daemon off;"]