import { DeleteStudentController } from "../../../src/presentation/controllers";

const makeDeleteStudentUseCase = () => {
  class DeleteStudentUseCaseStub {
    async delete() {
      await Promise.resolve();
    }
  }
  return new DeleteStudentUseCaseStub();
};

const makeSut = () => {
  const deleteUseCaseStub = makeDeleteStudentUseCase();
  const sut = new DeleteStudentController({
    deleteStudentUseCase: deleteUseCaseStub,
  });
  return {
    sut,
    deleteUseCaseStub,
  };
};

const fakeQuery = () => ({
  cpf: "84567329460",
});

describe("Delete Student Controller", () => {
  test("Should call deleteStudentUseCase with correct values", async () => {
    const { sut, deleteUseCaseStub } = makeSut();
    const deleteUseCaseSpy = jest.spyOn(deleteUseCaseStub, "delete");
    await sut.handle({ body: fakeQuery() });
    expect(deleteUseCaseSpy).toHaveBeenCalledWith(fakeQuery());
  });
});
