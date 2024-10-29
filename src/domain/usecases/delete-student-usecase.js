export default class DeleteStudentUseCase {
  #deleteStudentRepository;

  constructor({ deleteStudentRepository } = {}) {
    this.#deleteStudentRepository = deleteStudentRepository;
  }

  async delete(payload) {
    await this.#deleteStudentRepository.delete(payload);
  }
}
