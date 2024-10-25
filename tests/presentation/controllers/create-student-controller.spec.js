import { CreateStudentController } from "../../../src/presentation/controllers";

const makeCreateStudentUseCase = () => {
  class CreateStudentUseCaseStub {
    async create() {
      await Promise.resolve();
    }
  }
  return new CreateStudentUseCaseStub();
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
  const createUseCaseStub = makeCreateStudentUseCase();
  const validationsStub = makeValidations();
  const sut = new CreateStudentController({
    createStudentUseCase: createUseCaseStub,
    validation: validationsStub,
  });
  return {
    sut,
    createUseCaseStub,
    validationsStub,
  };
};

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
});

describe("List Students Controller", () => {
  test("Should call createStudentUseCase with correct values", async () => {
    const { sut, createUseCaseStub } = makeSut();
    const createUseCaseSpy = jest.spyOn(createUseCaseStub, "create");
    await sut.handle({ body: fakeQuery() });
    expect(createUseCaseSpy).toHaveBeenCalledWith(fakeQuery());
  });

  test("Should call validation with correct values", async () => {
    const { sut, validationsStub } = makeSut();
    const createUseCaseSpy = jest.spyOn(validationsStub, "validate");
    await sut.handle({ body: fakeQuery() });
    expect(createUseCaseSpy).toHaveBeenCalledWith(fakeQuery());
  });
});
