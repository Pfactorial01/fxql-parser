# FXQL Parser

## Setup

Run the following command:

```sh
npm install
```

Environment varaibles needed: DATABASE_URL (postgres), PORT

Then run dev server

```sh
npm run start:dev
```

To run productionc server

```sh
npm run build
npm run start:prod
```

To run unit tests

```sh
npm run test
```

## Api Documentation

Swagger documentation available at

```sh
https://fxql-parser.onrender.com/api
```

or

```sh
http://localhost:<PORT>/api
```

## Requirements

- Node.js >= 20.0.0
- npm >= 7.0.0
- docker >= 20.10.8

## Docker

Start docker container which contains server and database

```shell
docker-compose up --build
```
