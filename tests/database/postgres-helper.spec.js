import { PostgresHelper as sut } from "../../src/database/index";
import dbConfig from "../../src/config/database";

describe("Postgres Helper", () => {
  test("Should connect on postgres database and return a client", async () => {
    const config = dbConfig[process.env.NODE_ENV];
    const client = await sut.connect(config);
    expect(client).toBeTruthy();
  });
});
