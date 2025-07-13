import dotenv from "dotenv";
import type { Knex } from "knex";

import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

console.log("Loaded DB_HOST:", process.env.DB_HOST);
console.log("Loaded DB_NAME:", process.env.DB_NAME);
console.log("Loaded DB_USER:", process.env.DB_USER);
console.log("Loaded DB_CLIENT:", process.env.DB_CLIENT);

const config: { [key: string]: Knex.Config } = {
  local: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      ssl: false,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations2",
    },
  },
  prod: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations2",
    },
  },
};

// console.log("Knex config:", JSON.stringify(config, null, 2));

export default config;
