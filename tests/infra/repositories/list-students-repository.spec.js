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
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

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
      "SELECT name, email, ra, cpf FROM my_schema.students",
      null,
    );
  });
});
