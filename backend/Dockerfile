FROM strapi/base

WORKDIR /backend

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY . .

ENV NODE_ENV production

RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]
