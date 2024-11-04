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

  test("Should call postgresHelper disconnect", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    const postgresHelperSpy = jest.spyOn(mockPostgresHelper, "disconnect");
    await sut.create(fakeQuery());
    expect(postgresHelperSpy).toHaveBeenCalledTimes(1);
  });
});
