import HttpResponse from "../helpers/http-response";

export default class CreateStudentController {
  #createStudentUseCase;

  constructor({ createStudentUseCase }) {
    this.#createStudentUseCase = createStudentUseCase;
  }

  async handle(httpRequest) {
    try {
      if (!httpRequest?.body) throw new Error("Invalid Request");
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
