export default class ListStudentsUseCase {
  #listStudentsRepository;

  constructor({ listStudentsRepository } = {}) {
    this.#listStudentsRepository = listStudentsRepository;
  }

  async list(payload) {
    return this.#listStudentsRepository.list(payload);
  }
}
