import HttpResponse from "../helpers/http-response";

export default class UpdateStudentController {
  #updateStudentUseCase;

  constructor({ updateStudentUseCase }) {
    this.#updateStudentUseCase = updateStudentUseCase;
  }

  async handle(httpRequest) {
    try {
      return await this.#updateStudentUseCase.update(httpRequest.body);
    } catch (error) {
      return this.#switchResponse(error);
    }
  }

  #switchResponse(error) {
    switch (error.statusCode) {
      case 409:
        return HttpResponse.conflict(error.message);
      default:
        return HttpResponse.serverError(error);
    }
  }
}
