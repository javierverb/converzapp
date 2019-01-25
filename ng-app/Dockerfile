# base image
FROM node:10

# set working directory
WORKDIR /converzapp

# add `/converzapp/node_modules/.bin` to $PATH
ENV PATH /converzapp/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /converzapp/package.json
RUN npm install --silent

EXPOSE 4200
