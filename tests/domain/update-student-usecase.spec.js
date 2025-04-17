import { UpdateStudentUseCase } from "../../src/domain/usecases";

const makeUpdateStudentRepository = () => {
  class UpdateStudentRepositoryStub {
    async update() {
      await Promise.resolve();
    }
  }
  return new UpdateStudentRepositoryStub();
};

const makeSut = () => {
  const updateRepositoryStub = makeUpdateStudentRepository();
  const sut = new UpdateStudentUseCase({
    updateStudentRepository: updateRepositoryStub,
  });
  return {
    sut,
    updateRepositoryStub,
  };
};

const fakeQuery = () => ({
  name: "fake-name",
  email: "fake-email@mail.com",
  cpf: "84567329460",
  status: "active",
  avatar: "https://teste",
});

describe("Update Student UseCase", () => {
  test("Should call updateStudentRepository with correct values", async () => {
    const { sut, updateRepositoryStub } = makeSut();
    const updateRepositorySpy = jest.spyOn(updateRepositoryStub, "update");
    const payload = fakeQuery();
    await sut.update(payload);
    expect(updateRepositorySpy).toHaveBeenCalledWith(payload);
  });
});
