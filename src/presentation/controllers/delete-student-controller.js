export default class DeleteStudentController {
  #deleteStudentUseCase;

  #validation;

  constructor({ deleteStudentUseCase, validation }) {
    this.#deleteStudentUseCase = deleteStudentUseCase;
    this.#validation = validation;
  }

  async handle(httpRequest) {
    this.#validation.validate(httpRequest.body);
    await this.#deleteStudentUseCase.delete(httpRequest.body);
  }
}
