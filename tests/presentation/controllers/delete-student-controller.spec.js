import { DeleteStudentController } from "../../../src/presentation/controllers";
import HttpResponse from "../../../src/presentation/helpers/http-response";

const makeDeleteStudentUseCase = () => {
  class DeleteStudentUseCaseStub {
    async delete() {
      await Promise.resolve();
    }
  }
  return new DeleteStudentUseCaseStub();
};

const makeValidations = () => {
  class ValidationStub {
    validate() {
      return null;
    }
  }
  return new ValidationStub();
};

const makeSut = () => {
  const deleteUseCaseStub = makeDeleteStudentUseCase();
  const validationsStub = makeValidations();
  const sut = new DeleteStudentController({
    deleteStudentUseCase: deleteUseCaseStub,
    validation: validationsStub,
  });
  return {
    sut,
    deleteUseCaseStub,
    validationsStub,
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

  test("Should call validation with correct values", async () => {
    const { sut, validationsStub } = makeSut();
    const updateUseCaseSpy = jest.spyOn(validationsStub, "validate");
    await sut.handle({ body: fakeQuery() });
    expect(updateUseCaseSpy).toHaveBeenCalledWith(fakeQuery());
  });

  test("Should return badRequest if validation returns an error", async () => {
    const { sut, validationsStub } = makeSut();
    jest
      .spyOn(validationsStub, "validate")
      .mockReturnValueOnce(new Error("any_message"));
    const httpResponse = await sut.handle({ body: fakeQuery() });
    expect(httpResponse).toEqual(HttpResponse.badRequest("any_message"));
  });
});
