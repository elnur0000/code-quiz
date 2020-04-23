FROM node:12.14.1-slim as base

WORKDIR /usr/src

COPY package*.json ./

RUN npm config list \
    && npm ci \
    && npm cache clean --force



FROM base as dev

ENV PATH=/usr/src/node_modules/.bin:$PATH

WORKDIR /usr/src

RUN npm install --only=development
WORKDIR /usr/src/app

CMD ["react-scripts","start"]

FROM dev as test 

CMD ["react-scripts","test"]

FROM test as audit

RUN npm audit

ARG MICROSCANNER_TOKEN
ADD https://get.aquasec.com/microscanner /
RUN chmod +x /microscanner
RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN /microscanner $MICROSCANNER_TOKEN --continue-on-failure

# FROM source as prod
# WORKDIR /usr/src/app

# COPY . .

# CMD ["react-scripts","build"]
