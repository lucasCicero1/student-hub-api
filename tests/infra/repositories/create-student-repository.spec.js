import { CreateStudentRepository } from "../../../src/infra/repositories";

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
});

const makePostgresHelperMock = () => {
  class PostgresHelperMock {
    connect = jest.fn();

    disconnect = jest.fn();

    client = {
      query: jest.fn(),
    };
  }
  return new PostgresHelperMock();
};

const makeSut = () => {
  const mockPostgresHelper = makePostgresHelperMock();
  const sut = new CreateStudentRepository(mockPostgresHelper);
  mockPostgresHelper.connect.mockResolvedValue(mockPostgresHelper.client);
  return {
    sut,
    mockPostgresHelper,
  };
};

describe("Create Student Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should be able to create a student", async () => {
    const { sut } = makeSut();
    const response = await sut.create(fakeQuery());
    expect(response).toBeTruthy();
  });

  test("Should throw if PostgresHelper throws", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    jest
      .spyOn(mockPostgresHelper, "connect")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.create(fakeQuery());
    await expect(promise).rejects.toThrow();
  });

  test("Should call postgresHelper connect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "connect");
    await sut.create(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalledTimes(1);
  });

  test("Should be able to call PostgresHelper query begin before insert", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.create(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("BEGIN;");
  });

  test("Should be able to call PostgresHelper query method with correct sql and params", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.create(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith(
      "INSERT INTO my_schema.students (name, email, cpf) VALUES ($1, $2, $3);",
      ["fake-name", "fake-email@mail.com", "84567329460"],
    );
  });

  test("Should be able to call PostgresHelper query commit on success", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.create(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("COMMIT;");
  });

  test("Should call postgresHelper disconnect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "disconnect");
    await sut.create(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalledTimes(1);
  });

  test("Should call rollback if any error occurs", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query
      .mockImplementationOnce()
      .mockImplementationOnce(() => Promise.reject(new Error()));
    await expect(sut.create(fakeQuery())).rejects.toThrow();
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("ROLLBACK;");
  });
});
