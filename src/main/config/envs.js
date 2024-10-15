import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export class Envs {
  static NODE_ENV = process.env.NODE_ENV;

  static get POSTGRES() {
    return {
      development: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        max: 10,
        idleTimeoutMillis: 1000,
      },
      test: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        max: 1,
        idleTimeoutMillis: 0,
      },
      production: {},
    }[Envs.NODE_ENV];
  }
}
