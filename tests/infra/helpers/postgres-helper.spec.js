import { PostgresHelper } from "../../../src/infra/helpers/postgres-helper";

jest.mock("pg", () => ({
  Client: jest.fn().mockImplementation(() => ({
    connect: jest.fn(),
    end: jest.fn(),
  })),
}));

const sut = new PostgresHelper({ host: "localhost", port: 5432 });

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
