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
      console.log("error: ", error);
      return HttpResponse.serverError(error);
    }
  }
}
