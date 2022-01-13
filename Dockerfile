# base image
FROM node:12-alpine


# set working directory
WORKDIR /usr/src/app

#RUN apt-get update --no-install-recommends && \ 
#  apt-get install --no-install-recommends -y git python  && \
#  rm -rf /var/lib/apt/lists/*
RUN apk add --update --no-cache \
  bash git python make g++ &&\
	rm -rf /var/lib/apt/lists/*

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
#RUN npm install -g expo-cli
#RUN npm install -g eas-cli
#RUN npm install -g expo-cli@4.4.1
RUN yarn global add expo-cli
RUN yarn global add eas-cli


COPY package.json /usr/src/app
RUN yarn install

EXPOSE 19000 19001 19002 19003 19006
