import { CreateStudentUseCase } from "../../src/domain/usecases";

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
});
