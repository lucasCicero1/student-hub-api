import { DeleteStudentUseCase } from "../../src/domain/usecases";

const makeDeleteStudentRepository = () => {
  class DeleteStudentRepositoryStub {
    async delete() {
      await Promise.resolve();
    }
  }
  return new DeleteStudentRepositoryStub();
};

const makeSut = () => {
  const deleteRepositoryStub = makeDeleteStudentRepository();
  const sut = new DeleteStudentUseCase({
    deleteStudentRepository: deleteRepositoryStub,
  });
  return {
    sut,
    deleteRepositoryStub,
  };
};

const fakeQuery = () => ({
  cpf: "84567329460",
});

describe("Delete Student UseCase", () => {
  test("Should call deleteStudentRepository with correct values", async () => {
    const { sut, deleteRepositoryStub } = makeSut();
    const deleteRepositorySpy = jest.spyOn(deleteRepositoryStub, "delete");
    const payload = fakeQuery();
    await sut.delete(payload);
    expect(deleteRepositorySpy).toHaveBeenCalledWith(payload);
  });
});
