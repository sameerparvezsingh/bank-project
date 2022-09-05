FROM registry.oecloud.local/alpine-node:latest
#FROM 17-alpine3.12
RUN mkdir /auth-microservice
WORKDIR /auth-microservice
COPY . /auth-microservice
#RUN npm install
EXPOSE 5000
CMD [ "node", "server.js" ]
#CMD node index.js

#docker build . -t capstone/auth-microservice