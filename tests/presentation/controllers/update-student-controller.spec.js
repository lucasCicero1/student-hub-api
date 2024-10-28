import { UpdateStudentController } from "../../../src/presentation/controllers";

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
});
