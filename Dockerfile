FROM node

RUN mkdir -p /home/index

COPY . /home/index
EXPOSE 4000
CMD ["node", "/home/index/index.js"]