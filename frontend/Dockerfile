FROM registry.oecloud.local/alpine-node:latest
#FROM 17-alpine3.12
RUN mkdir /frontend
WORKDIR /frontend
COPY . /frontend
#RUN npm install
EXPOSE 3000
CMD [ "npx serve -s buildvm" ]
#CMD node index.js

#docker build . -t capstone/frontend