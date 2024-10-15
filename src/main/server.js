import { PostgresHelper } from "../infra/helpers/postgres-helper";
import app from "./config/app";
import { Envs } from "./config/envs";

const port = 3000;
let server = null;

const postgresHelper = new PostgresHelper(Envs.POSTGRES);

function initializeServer() {
  postgresHelper
    .connect()
    .then(() => {
      server = app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

process.on("uncaughtException", async (error) => console.error(error));
process.on("unhandledRejection", async (error) => console.error(error));

function gracefulShutdown(event) {
  return (code) => {
    server.close(async () => {
      const time = new Date().toISOString();
      console.log(`${code}: Closing App ${process.pid} - ${event}`);
      await postgresHelper.disconnect();
      console.log(`Postgres disconnected: ${time}, ${process.pid}`);
      process.exit(0);
    });
  };
}

process.on("SIGINT", gracefulShutdown("SIGINT"));
process.on("SIGTERM", gracefulShutdown("SIGTERM"));

initializeServer();
