import { CreateStudentController } from "../../../src/presentation/controllers";
import HttpResponse from "../../../src/presentation/helpers/http-response";
import { UserExistsError } from "../../../src/domain/errors";

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

  test("Should return badRequest if validation returns an error", async () => {
    const { sut, validationsStub } = makeSut();
    jest
      .spyOn(validationsStub, "validate")
      .mockReturnValueOnce(new Error("any_message"));
    const httpResponse = await sut.handle({ body: fakeQuery() });
    expect(httpResponse).toEqual(HttpResponse.badRequest("any_message"));
  });

  test("Should return 201 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(
      HttpResponse.created({ message: "Student was created successfully." }),
    );
  });

  test("Should return 409 if createStudentUseCase throws on its validation", async () => {
    const { sut, createUseCaseStub } = makeSut();
    const cpf = "96584762179";
    jest
      .spyOn(createUseCaseStub, "create")
      .mockReturnValueOnce(Promise.reject(new UserExistsError(cpf)));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(
      HttpResponse.conflict(`User with cpf: ${cpf} already exists!`),
    );
  });
});
