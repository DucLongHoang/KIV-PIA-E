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

- after cloning the repository:
- install dependencies in root: execute `npm i`
  - execute the same command in these folders as well:
    - `./packages`
    - `./apps/backend`
    - `./apps/frontend`
    - `./apps/shared` and stay in this directory
- while in `./apps/shared`: execute `npm run build`
  - this builds the shared dependencies
- now we have to link the shared dependencies to the FE
  - move to `./apps/frontend/node_modules`
    - execute: `rm -rf shared`
    - execute: `ln -s ../../shared/dist shared`
- go back to root of app
- go to backend root: execute `cd apps/backend`
  - create `.env` file: execute `touch .env`
  - fill `.env` file with this line:
    - `DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public`
  - run database: execute `docker-compose up -d`
  - migrate database: execute `npm run db:migrate`
  - seed database: execute `npm run db:seed`
- use `DBeaver` to see the data
- go back to project root
- execute: `npm run start` or `npx turbo run start`
