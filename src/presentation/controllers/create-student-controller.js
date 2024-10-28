import HttpResponse from "../helpers/http-response";

export default class CreateStudentController {
  #createStudentUseCase;

  #validation;

  constructor({ createStudentUseCase, validation }) {
    this.#createStudentUseCase = createStudentUseCase;
    this.#validation = validation;
  }

  async handle(httpRequest) {
    try {
      const error = this.#validation.validate(httpRequest.body);
      if (error) return HttpResponse.badRequest(error.message);
      await this.#createStudentUseCase.create(httpRequest.body);
      return HttpResponse.created({
        message: "Student was created successfully.",
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
