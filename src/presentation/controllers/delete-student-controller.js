import HttpResponse from "../helpers/http-response";

export default class DeleteStudentController {
  #deleteStudentUseCase;

  #validation;

  constructor({ deleteStudentUseCase, validation }) {
    this.#deleteStudentUseCase = deleteStudentUseCase;
    this.#validation = validation;
  }

  async handle(httpRequest) {
    const error = this.#validation.validate(httpRequest.body);
    if (error) return HttpResponse.badRequest(error.message);
    await this.#deleteStudentUseCase.delete(httpRequest.body);
    return HttpResponse.noContent();
  }
}
