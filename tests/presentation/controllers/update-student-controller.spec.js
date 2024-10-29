import { UpdateStudentController } from "../../../src/presentation/controllers";
import HttpResponse from "../../../src/presentation/helpers/http-response";

const makeUpdateStudentUseCase = () => {
  class UpdateStudentUseCaseStub {
    async update() {
      await Promise.resolve();
    }
  }
  return new UpdateStudentUseCaseStub();
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
  const updateUseCaseStub = makeUpdateStudentUseCase();
  const validationsStub = makeValidations();
  const sut = new UpdateStudentController({
    updateStudentUseCase: updateUseCaseStub,
    validation: validationsStub,
  });
  return {
    sut,
    updateUseCaseStub,
    validationsStub,
  };
};

const fakeQuery = () => ({
  cpf: "84567329460",
});

describe("Update Student Controller", () => {
  test("Should call updateStudentUseCase with correct values", async () => {
    const { sut, updateUseCaseStub } = makeSut();
    const updateUseCaseSpy = jest.spyOn(updateUseCaseStub, "update");
    await sut.handle({ body: fakeQuery() });
    expect(updateUseCaseSpy).toHaveBeenCalledWith(fakeQuery());
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

  test("Should return 204 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(HttpResponse.updated());
  });

  test("Should return 500 if updateStudentUseCase throws", async () => {
    const { sut, updateUseCaseStub } = makeSut();
    jest
      .spyOn(updateUseCaseStub, "update")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
});
