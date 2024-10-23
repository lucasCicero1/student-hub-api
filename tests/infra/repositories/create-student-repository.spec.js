import { PostgresHelper } from "../../../src/infra/helpers/postgres-helper";
import { Envs } from "../../../src/main/config/envs";
import { CreateStudentRepository } from "../../../src/infra/repositories";

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
});

describe("Create Student Repository", () => {
  const postgresHelper = new PostgresHelper(Envs.POSTGRES);
  const makeSut = () => new CreateStudentRepository(postgresHelper);
  let client;
  const sql =
    "INSERT INTO fake_students (name, email, cpf) VALUES ($1, $2, $3);";

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

  test("Should be able to create a student", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "sql", "get").mockReturnValue(sql);
    const response = await sut.create(fakeQuery());
    expect(response).toBeTruthy();
  });

  test("Should throw if PostgresHelper throws", async () => {
    const sut = makeSut();
    jest
      .spyOn(postgresHelper, "connect")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.create(fakeQuery());
    await expect(promise).rejects.toThrow();
  });

  test("Should call postgresHelper connect", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "sql", "get").mockReturnValue(sql);
    const postgresHelperSpy = jest.spyOn(postgresHelper, "connect");
    await sut.create(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalled();
  });

  test("Should call postgresHelper disconnect", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "sql", "get").mockReturnValue(sql);
    const postgresHelperSpy = jest.spyOn(postgresHelper, "disconnect");
    await sut.create(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalled();
  });
});
