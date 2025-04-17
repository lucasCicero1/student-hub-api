import { ListStudentsController } from "../../../src/presentation/controllers";
import HttpResponse from "../../../src/presentation/helpers/http-response";

const makeListUseCase = () => {
  class ListUseCaseStub {
    async list() {
      await Promise.resolve();
    }
  }
  return new ListUseCaseStub();
};

const makeSut = () => {
  const listUseCaseStub = makeListUseCase();
  const sut = new ListStudentsController({
    listStudentsUseCase: listUseCaseStub,
  });
  return {
    sut,
    listUseCaseStub,
  };
};

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
  status: "active",
  avatar: "https://teste",
});

describe("List Students Controller", () => {
  test("Should call listStudentsUseCase with correct values", async () => {
    const { sut, listUseCaseStub } = makeSut();
    const listUseCaseSpy = jest.spyOn(listUseCaseStub, "list");
    await sut.handle({ body: fakeQuery() });
    expect(listUseCaseSpy).toHaveBeenCalledWith(fakeQuery());
  });

  test("Should return 200 on success", async () => {
    const { sut, listUseCaseStub } = makeSut();
    jest
      .spyOn(listUseCaseStub, "list")
      .mockReturnValueOnce([{ ...fakeQuery(), ra: "any_ra" }]);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(
      HttpResponse.ok([{ ...fakeQuery(), ra: "any_ra" }]),
    );
  });

  test("Should return 204 if there is no students to retrieve", async () => {
    const { sut, listUseCaseStub } = makeSut();
    jest.spyOn(listUseCaseStub, "list").mockReturnValueOnce([]);
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(HttpResponse.noContent());
  });

  test("Should return 500 if listStudentsUseCase throws", async () => {
    const { sut, listUseCaseStub } = makeSut();
    jest
      .spyOn(listUseCaseStub, "list")
      .mockReturnValueOnce(Promise.reject(new Error()));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(HttpResponse.serverError(new Error()));
  });
});
