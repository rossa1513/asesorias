FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 82

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]