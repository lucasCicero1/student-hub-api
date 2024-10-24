import { PostgresHelper } from "../../../src/infra/helpers/postgres-helper";
import { Envs } from "../../../src/main/config/envs";
import { ListStudentsRepository } from "../../../src/infra/repositories";

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
});

describe("List Students Repository", () => {
  const postgresHelper = new PostgresHelper(Envs.POSTGRES);
  const makeSut = () => new ListStudentsRepository(postgresHelper);
  let client;
  const sql = "SELECT name, email, ra, cpf FROM fake_students";

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

  afterAll(async () => {
    await postgresHelper.disconnect();
  });

  test("Should be able to list students", async () => {
    const { name, email, cpf } = fakeQuery();
    await client.query(
      "INSERT INTO fake_students (name, email, cpf) VALUES ($1, $2, $3)",
      [name, email, cpf],
    );
    const sut = makeSut();
    jest.spyOn(sut, "sql", "get").mockReturnValue(sql);
    const [students] = await sut.list();
    expect(students).toBeTruthy();
    expect(students.name).toBe("fake-name");
    expect(students.email).toBe("fake-email@mail.com");
    expect(students.ra).toBeTruthy();
    expect(students.cpf).toBe("84567329460");
  });
});
