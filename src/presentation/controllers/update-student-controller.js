import HttpResponse from "../helpers/http-response";

export default class UpdateStudentController {
  #updateStudentUseCase;

  #validation;

  constructor({ updateStudentUseCase, validation }) {
    this.#updateStudentUseCase = updateStudentUseCase;
    this.#validation = validation;
  }

  async handle(httpRequest) {
    try {
      const error = this.#validation.validate(httpRequest.body);
      if (error) return HttpResponse.badRequest(error.message);
      await this.#updateStudentUseCase.update(httpRequest.body);
      return HttpResponse.updated();
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}
