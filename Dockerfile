FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma migrate deploy

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]