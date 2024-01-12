# KIV-PIA-E

Semestral project of KIV/PIA-E - Programming of internet applications

## Prerequisites

- installed `Node.js` >= `16.19.1` (ideally this exact version as it was developed with)
- installed `docker` and `docker-compose`

## Used technologies

- package manager - `npm`
- monorepository management - **[turborepo](https://turbo.build/)**
- bundler - `webpack`
- **frontend**
  - `React.js`
  - `TypeScript`
  - components - **[radix-ui](https://www.radix-ui.com/docs/primitives/overview/introduction)**
  - styles - **[Stitches.css](https://stitches.dev/docs/introduction)**
- **backend**
  - `Node.js`
  - `TypeScript`
  - server - **[Fastify](https://fastify.dev/docs/latest/Reference/)**
  - API - **[tRPC](https://trpc.io/)**
  - database - `PostgreSQL`
  - db management - **[Prisma](https://www.prisma.io/docs/getting-started/quickstart)**

## Project structure

- monorepository style
  - `./apps` - directory with apps
  - `./apps/backend` - backend
  - `./apps/backend/prisma` - db and prisma
  - `./apps/frontend` - frontend
  - `./apps/shared` - shared types

## How to - first launch

- after cloning the repository navigate to root
- install dependencies: `npm run install:all`
- build shared types: `npm run build:shared`
- link shared types: `npm run link:shared`
- start Docker container with database: `npm run db:up`
- migrate the database: `npm run db:migrate`
- seed the database: `npm run db:seed`
- start the project: `npm run start`
- the backend server will be running on localhost on port `5000`
- the frontend will be running on localhost on port `3000`
- enjoy

## Test

- with the app running, try to log as some users:
  - username: `markz`, password: `123456`, role: SUBORDINATE
  - username: `duclong`, password: `123456`, role: SUPERIOR
  - username: `tcook`, password: `123456`, role: SECRETARIAT
