export default class UpdateStudentUseCase {
  #updateStudentRepository;

  constructor({ updateStudentRepository } = {}) {
    this.#updateStudentRepository = updateStudentRepository;
  }

  async update(payload) {
    await this.#updateStudentRepository.update(payload);
  }
}
