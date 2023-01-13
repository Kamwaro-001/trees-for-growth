###########
# BUILDER #
###########

# pull official base image
FROM node:18-alpine as builder

# set work directory
WORKDIR /usr/src/app

# install dependencies and avoid `node-gyp rebuild` errors
COPY ./react/package.json .
RUN apk add --no-cache --virtual .gyp \
        python3 \
        make \
        g++ \
    && npm install \
    && apk del .gyp

# copy our react project
COPY ./react .

# perform npm build
ARG API_SERVER
ENV REACT_API_SERVER=${API_SERVER}
RUN REACT_API_SERVER=${API_SERVER} \ 
  npm run build

#########
# FINAL #
#########

# pull official base image
FROM node:18-alpine 

# set work directory
WORKDIR /usr/src/app

# install serve - deployment static server suggested by official create-react-app
RUN npm install -g serve

# copy our build files from our builder stage
COPY --from=builder /usr/src/app/build ./build