import { UpdateStudentRepository } from "../../../src/infra/repositories";

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
  status: "active",
  avatar: "https://teste",
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
  const sut = new UpdateStudentRepository(mockPostgresHelper);
  mockPostgresHelper.connect.mockResolvedValue(mockPostgresHelper.client);
  return {
    sut,
    mockPostgresHelper,
  };
};

describe("Update Student Repository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should be able to update a student", async () => {
    const { sut } = makeSut();
    const response = await sut.update(fakeQuery());
    expect(response).toBeTruthy();
  });

  test("Should throw if PostgresHelper throws", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    jest
      .spyOn(mockPostgresHelper, "connect")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.update(fakeQuery());
    await expect(promise).rejects.toThrow();
  });

  test("Should call postgresHelper connect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "connect");
    await sut.update(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalled();
  });

  test("Should be able to call PostgresHelper query begin before update", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.update(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("BEGIN;");
  });

  test("Should be able to call PostgresHelper with correct sql and params", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.update(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith(
      "UPDATE my_schema.students SET (name, email, status, avatar) = ($1, $2, $4, $5) WHERE cpf = $3",
      [
        "fake-name",
        "fake-email@mail.com",
        "84567329460",
        "active",
        "https://teste",
      ],
    );
  });

  test("Should be able to call PostgresHelper query commit on success", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.update(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("COMMIT;");
  });

  test("Should call rollback if any error occurs", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query
      .mockImplementationOnce()
      .mockImplementationOnce(() => Promise.reject(new Error()));
    await expect(sut.update(fakeQuery())).rejects.toThrow();
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("ROLLBACK;");
  });

  test("Should call postgresHelper disconnect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "disconnect");
    await sut.update(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalled();
  });
});
