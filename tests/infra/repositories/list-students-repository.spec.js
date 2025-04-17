import { ListStudentsRepository } from "../../../src/infra/repositories";

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
  const sut = new ListStudentsRepository(mockPostgresHelper);
  mockPostgresHelper.connect.mockResolvedValue(mockPostgresHelper.client);
  return {
    sut,
    mockPostgresHelper,
  };
};

describe("List Students Repository", () => {
  const mockData = [
    {
      name: "test",
      email: "test@mail.com",
      ra: "12345",
      cpf: "11122233344",
      status: "active",
      avatar: "https://teste",
    },
  ];

  test("Should be able to list students", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query.mockResolvedValue({ rows: mockData });
    const students = await sut.listStudents();
    expect(students).toEqual(mockData);
  });

  test("Should be able to call PostgresHelper connect method", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query.mockResolvedValue({ rows: mockData });
    await sut.listStudents();
    expect(mockPostgresHelper.connect).toHaveBeenCalledTimes(1);
  });

  test("Should be able to call PostgresHelper query method with correct values", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query.mockResolvedValue({ rows: mockData });
    await sut.listStudents();
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith(
      "SELECT id, name, email, ra, cpf, status, avatar FROM my_schema.students",
      null,
    );
  });

  test("Should be able to call PostgresHelper disconnect method", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query.mockResolvedValue({ rows: mockData });
    await sut.listStudents();
    expect(mockPostgresHelper.disconnect).toHaveBeenCalledTimes(1);
  });

  test("Should throw if PostgresHelper throws", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    jest
      .spyOn(mockPostgresHelper, "connect")
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const promise = sut.listStudents();
    await expect(promise).rejects.toThrow();
  });

  test("Should return empty array if there is no data in the database", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query.mockResolvedValue({ rows: [] });
    const students = await sut.listStudents();
    expect(students).toHaveLength(0);
  });

  test("Should be able to list a student by cpf", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query.mockResolvedValue({ rows: mockData });
    const students = await sut.listStudentByCpf({ cpf: "some-cpf" });
    expect(students).toEqual(mockData);
  });

  test("Should be able to call PostgresHelper query method with correct sql and cpf param", async () => {
    const { sut, mockPostgresHelper } = makeSut();
    mockPostgresHelper.client.query.mockResolvedValue({ rows: mockData });
    await sut.listStudentByCpf({ cpf: "some-cpf" });
    expect(mockPostgresHelper.client.query).toHaveBeenCalledWith(
      "SELECT id, name, email, ra, cpf, status, avatar FROM my_schema.students WHERE cpf = $1",
      ["some-cpf"],
    );
  });
});
