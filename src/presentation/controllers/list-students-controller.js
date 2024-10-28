import HttpResponse from "../helpers/http-response";

export default class ListStudentsController {
  #listStudentsUseCase;

  constructor({ listStudentsUseCase }) {
    this.#listStudentsUseCase = listStudentsUseCase;
  }

  async handle(httpRequest) {
    try {
      const students = await this.#listStudentsUseCase.list(httpRequest.body);
      return students?.length
        ? HttpResponse.ok(students)
        : HttpResponse.noContent();
    } catch (error) {
      return HttpResponse.serverError(error);
    }
  }
}
