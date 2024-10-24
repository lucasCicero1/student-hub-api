import HttpResponse from "../helpers/http-response";

export default class ListStudentsController {
  #listStudentsUseCase;

  constructor({ listStudentsUseCase }) {
    this.#listStudentsUseCase = listStudentsUseCase;
  }

  async handle(httpRequest) {
    try {
      const students = await this.#listStudentsUseCase.list(httpRequest.body);
      return HttpResponse.ok(students);
    } catch (error) {
      console.log(error);
      return HttpResponse.serverError(error);
    }
  }
}
