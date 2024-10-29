import { PostgresHelper } from "../../../src/infra/helpers/postgres-helper";
import { Envs } from "../../../src/main/config/envs";
import { DeleteStudentRepository } from "../../../src/infra/repositories";

const fakeQuery = () => ({
  cpf: "84567329460",
});

describe("Delete Student Repository", () => {
  const postgresHelper = new PostgresHelper(Envs.POSTGRES);
  const makeSut = () => new DeleteStudentRepository(postgresHelper);
  let client;
  const sql = "DELETE FROM fake_students WHERE cpf = $1;";

  afterAll(async () => {
    await postgresHelper.disconnect();
  });

  beforeEach(async () => {
    client = await postgresHelper.connect();
    await client.query(
      "CREATE TEMPORARY TABLE fake_students (LIKE my_schema.students INCLUDING ALL)",
    );
  });

  afterEach(async () => {
    client = await postgresHelper.connect();
    await client.query("DROP TABLE IF EXISTS pg_temp.fake_students");
  });

  test("Should be able to delete a student", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "sql", "get").mockReturnValue(sql);
    const response = await sut.delete(fakeQuery());
    expect(response).toBeTruthy();
  });

  test("Should throw if PostgresHelper throws", async () => {
    const sut = makeSut();
    jest
      .spyOn(postgresHelper, "connect")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.delete(fakeQuery());
    await expect(promise).rejects.toThrow();
  });
});
