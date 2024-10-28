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
      return HttpResponse.updated({
        message: "Student was updated successfully.",
      });
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
