import { ListStudentsUseCase } from "../../src/domain/usecases";

const makeListRepository = () => {
  class ListRepositoryStub {
    async listStudents() {
      await Promise.resolve();
    }
  }
  return new ListRepositoryStub();
};

const makeSut = () => {
  const listRepositoryStub = makeListRepository();
  const sut = new ListStudentsUseCase({
    listStudentsRepository: listRepositoryStub,
  });
  return {
    sut,
    listRepositoryStub,
  };
};

describe("Create Student UseCase", () => {
  test("Should call listStudentsRepository", async () => {
    const { sut, listRepositoryStub } = makeSut();
    const listRepositorySpy = jest.spyOn(listRepositoryStub, "listStudents");
    await sut.list();
    expect(listRepositorySpy).toHaveBeenCalled();
  });
});
