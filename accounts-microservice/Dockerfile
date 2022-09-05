FROM registry.oecloud.local/alpine-node:latest
#FROM 17-alpine3.12
RUN mkdir /accounts-microservice
WORKDIR /accounts-microservice
COPY . /accounts-microservice
#RUN npm install
EXPOSE 3005
CMD [ "node", "index.js" ]
#CMD node index.js

#docker build . -t capstone/accounts-microservice