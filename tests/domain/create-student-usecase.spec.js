import { CreateStudentUseCase } from "../../src/domain/usecases";
import { UserExistsError } from "../../src/domain/errors";

const makeCreateStudentRepository = () => {
  class CreateStudentRepositoryStub {
    async create() {
      await Promise.resolve();
    }
  }
  return new CreateStudentRepositoryStub();
};

const makeListRepository = () => {
  class ListRepositoryStub {
    async listStudentByCpf() {
      await Promise.resolve();
    }
  }
  return new ListRepositoryStub();
};

const makeSut = () => {
  const createRepositoryStub = makeCreateStudentRepository();
  const listRepositoryStub = makeListRepository();
  const sut = new CreateStudentUseCase({
    createStudentRepository: createRepositoryStub,
    listStudentsRepository: listRepositoryStub,
  });
  return {
    sut,
    createRepositoryStub,
    listRepositoryStub,
  };
};

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
  status: "active",
  avatar: "https://teste",
});

describe("Create Student UseCase", () => {
  test("Should call listStudentsRepository with correct values", async () => {
    const { sut, listRepositoryStub } = makeSut();
    const listRepositorySpy = jest.spyOn(
      listRepositoryStub,
      "listStudentByCpf",
    );
    await sut.create(fakeQuery());
    expect(listRepositorySpy).toHaveBeenCalledWith({ cpf: "84567329460" });
  });

  test("Should return UserExistsError if cpf already exists", async () => {
    const { sut, listRepositoryStub } = makeSut();
    jest
      .spyOn(listRepositoryStub, "listStudentByCpf")
      .mockReturnValueOnce([{ ...fakeQuery(), ra: "any_ra" }]);
    const cpf = "84567329460";
    const promise = sut.create(fakeQuery());
    await expect(promise).rejects.toEqual(new UserExistsError(cpf));
  });

  test("Should call createStudentRepository with correct values", async () => {
    const { sut, createRepositoryStub } = makeSut();
    const createRepositorySpy = jest.spyOn(createRepositoryStub, "create");
    const payload = fakeQuery();
    await sut.create(payload);
    expect(createRepositorySpy).toHaveBeenCalledWith(payload);
  });
});
