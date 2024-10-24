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
    const [students] = await sut.listStudents();
    expect(students).toBeTruthy();
    expect(students.name).toBe("fake-name");
    expect(students.email).toBe("fake-email@mail.com");
    expect(students.ra).toBeTruthy();
    expect(students.cpf).toBe("84567329460");
  });

  test("Should return empty array if there is no data in the database", async () => {
    const sut = makeSut();
    jest.spyOn(sut, "sql", "get").mockReturnValue(sql);
    const students = await sut.listStudents();
    expect(students).toHaveLength(0);
  });

  test("Should be able to list a student by cpf", async () => {
    await client.query(
      "INSERT INTO fake_students (name, email, cpf) VALUES ('fake-name', 'fake-email@mail.com', '12345678945'), ('other-name', 'other-name@mail.com', '56345678342')",
    );
    const sqlByCpf =
      "SELECT name, email, ra, cpf FROM fake_students WHERE cpf = $1";
    const sut = makeSut();
    jest.spyOn(sut, "sqlWithCpf", "get").mockReturnValue(sqlByCpf);
    const [students] = await sut.listStudentByCpf({ cpf: "56345678342" });
    expect(students).toBeTruthy();
    expect(students.name).toBe("other-name");
    expect(students.email).toBe("other-name@mail.com");
    expect(students.ra).toBeTruthy();
    expect(students.cpf).toBe("56345678342");
  });
});
