import HttpResponse from "../helpers/http-response";

export default class DeleteStudentController {
  #deleteStudentUseCase;

  #validation;

  constructor({ deleteStudentUseCase, validation }) {
    this.#deleteStudentUseCase = deleteStudentUseCase;
    this.#validation = validation;
  }

  async handle(httpRequest) {
    try {
      const error = this.#validation.validate(httpRequest.query);
      if (error) return HttpResponse.badRequest(error.message);
      await this.#deleteStudentUseCase.delete(httpRequest.query);
      return HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}
