# Simple API

## About The Project

This project is a simple RESTful API scaffold built with TypeScript, Express, and Drizzle ORM using a local PostgreSQL database. It includes an example `items` table and CRUD endpoints for creating, retrieving, and deleting items. It’s designed to be easily extendable with additional resources, schemas, and endpoints.

### Built With

- [![TypeScript][TypeScript]][TypeScript-url]
- [![Express][Express]][Express-url]
- [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
- [![Drizzle][Drizzle]][Drizzle-url]
- [![ts-node][ts-node]][ts-node-url]
- [![Zod][Zod]][Zod-url]

## Getting Started

### Installation and Configuration

#### 1. Clone the project, navigate to the `/simple-api` directory, and install dependencies:

```sh
npm install
```

#### 2. Local Database Setup

You’ll need two PostgreSQL databases running locally: one for development and one for testing. Update connection settings in the following files:

Dev DB: `/src/db/index.ts`

Test DB: `/src/db/test-db.ts`

Ensure the database user has permissions to create tables.

#### 3. Generate and Apply Migrations

If you modify `/src/db/schema.ts`, you’ll need to:

1.  Generate migrations (you might want to delete the sample ones inside /migrations first):

```sh
npx drizzle-kit generate
```

2.  Set the correct `dbCredentials.url` in `drizzle.config.ts`

3.  Apply migrations:

```sh
npx drizzle-kit push
```

Repeat for both the development and test databases. If you want to use the existing schema without changes, do steps 2 and 3 without generating a new migration.

### Usage

Start dev server:

```sh
npm run dev
```

Test the server by opening your browser or Postman to: `http://localhost:3000/ping`

You should get `{ message: "pong" }` in response.

### Example Endpoints

There are a few endpoints that have been created already as examples. They are:

Health Check

- `GET /ping`: Returns `{ message: "pong" }`

Items

- `GET /items`: List all items
- `POST /items`: Create an item
  - Required fields:
    - `name` (string)
    - `quantity` (integer)
  - Optional:
    - `description` (string)
- `DELETE /items`: Delete an item by `id` (uuid)

### Running Tests

Make sure your test database is migrated before running:

```sh
npm run test
```

Tests are written using `supertest` and run against an isolated test database configured at `/src/db/test-db.ts`.

## Contact

Christopher Lewis - [LinkedIn][LinkedIn-url] - Email: chris@csvlewis.com

Project Link: [GitHub][GitHub-url]

[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.npmjs.com/package/typescript
[Express]: https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://www.npmjs.com/package/express
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=PostgreSQL&logoColor=white
[PostgreSQL-url]: https://www.npmjs.com/package/pg
[Drizzle]: https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=Drizzle&logoColor=black
[Drizzle-url]: https://www.npmjs.com/package/drizzle-orm
[ts-node]: https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white
[ts-node-url]: https://www.npmjs.com/package/ts-node
[Zod]: https://img.shields.io/badge/zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white
[Zod-url]: https://www.npmjs.com/package/zod
[GitHub-url]: https://github.com/csvlewis/simple-api
[LinkedIn-url]: https://linkedin.com/in/csvlewis
