FROM node:23-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g sequelize-cli

EXPOSE 3000

CMD ["sh", "-c", "sequelize db:migrate && npm run dev"]