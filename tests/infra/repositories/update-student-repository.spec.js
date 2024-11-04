import { UpdateStudentRepository } from "../../../src/infra/repositories";

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
  const sut = new UpdateStudentRepository(mockPostgresHelper);
  mockPostgresHelper.connect.mockResolvedValue(mockPostgresHelper.client);
  return {
    sut,
    mockPostgresHelper,
  };
};

describe("Update Student Repository", () => {
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

  test("Should call postgresHelper disconnect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "disconnect");
    await sut.update(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalled();
  });
});
