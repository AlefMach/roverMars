FROM node:slim as build

RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y --no-install-recommends curl git build-essential make \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

COPY . ./

RUN npm run build

CMD ["npm", "start"]