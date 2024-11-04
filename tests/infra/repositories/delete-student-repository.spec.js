import { DeleteStudentRepository } from "../../../src/infra/repositories";

const fakeQuery = () => ({
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
  const sut = new DeleteStudentRepository(mockPostgresHelper);
  mockPostgresHelper.connect.mockResolvedValue(mockPostgresHelper.client);
  return {
    sut,
    mockPostgresHelper,
  };
};

describe("Delete Student Repository", () => {
  test("Should be able to delete a student", async () => {
    const { sut } = makeSut();
    const response = await sut.delete(fakeQuery());
    expect(response).toBeTruthy();
  });

  test("Should throw if PostgresHelper throws", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    jest
      .spyOn(mockPostgresHelper, "connect")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.delete(fakeQuery());
    await expect(promise).rejects.toThrow();
  });

  test("Should call postgresHelper connect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "connect");
    await sut.delete(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalled();
  });

  test("Should be able to call PostgresHelper query begin before delete", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.delete(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("BEGIN;");
  });

  test("Should be able to call PostgresHelper with correct sql and params", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.delete(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith(
      "DELETE FROM my_schema.students WHERE cpf = $1",
      ["84567329460"],
    );
  });

  test("Should be able to call PostgresHelper query commit on success", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    await sut.delete(fakeQuery());
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("COMMIT;");
  });

  test("Should call rollback if any error occurs", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query
      .mockImplementationOnce()
      .mockImplementationOnce(() => Promise.reject(new Error()));
    await expect(sut.delete(fakeQuery())).rejects.toThrow();
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith("ROLLBACK;");
  });

  test("Should call postgresHelper disconnect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "disconnect");
    await sut.delete(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalled();
  });
});
