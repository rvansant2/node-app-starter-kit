FROM node:latest as builder

RUN mkdir -p /build
WORKDIR /build

COPY ./.babelrc ./.eslintrc ./package*.json ./
COPY ./config ./config
RUN npm install
COPY ./src ./src
RUN npm run build

FROM node:latest

RUN mkdir -p /api
COPY --from=builder /build/ /api/
WORKDIR /api

COPY ./package*.json ./
COPY ./config ./config
RUN npm install --only=production
CMD npm start
