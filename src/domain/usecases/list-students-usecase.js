export default class ListStudentsUseCase {
  #listStudentsRepository;

  constructor({ listStudentsRepository } = {}) {
    this.#listStudentsRepository = listStudentsRepository;
  }

  async list() {
    return this.#listStudentsRepository.listStudents();
  }
}
