import { PostgresHelper } from "../../../src/infra/helpers/postgres-helper";
import { Envs } from "../../../src/main/config/envs";

const sut = new PostgresHelper(Envs.POSTGRES);

describe("Postgres Helper", () => {
  test("Should connect on postgres database and return a client", async () => {
    const client = await sut.connect();
    expect(client).toBeTruthy();
  });

  test("Should disconnect from postgres database", async () => {
    await sut.disconnect();
    expect(sut.client).toBeNull();
  });
});
