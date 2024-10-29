export default class DeleteStudentController {
  #deleteStudentUseCase;

  constructor({ deleteStudentUseCase }) {
    this.#deleteStudentUseCase = deleteStudentUseCase;
  }

  async handle(httpRequest) {
    await this.#deleteStudentUseCase.delete(httpRequest.body);
  }
}
