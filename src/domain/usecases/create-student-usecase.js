export default class CreateStudentUseCase {
  #createStudentRepository;

  constructor({ createStudentRepository } = {}) {
    this.#createStudentRepository = createStudentRepository;
  }

  async create(payload) {
    await this.#createStudentRepository.create(payload);
  }
}
