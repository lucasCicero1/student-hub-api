import { UserExistsError } from "../errors";

export default class CreateStudentUseCase {
  #createStudentRepository;

  #listStudentsRepository;

  constructor({ createStudentRepository, listStudentsRepository } = {}) {
    this.#createStudentRepository = createStudentRepository;
    this.#listStudentsRepository = listStudentsRepository;
  }

  async create(payload) {
    await this.#validate(payload);
    await this.#createStudentRepository.create(payload);
  }

  async #validate({ cpf }) {
    const exists = await this.#listStudentsRepository.listStudentByCpf({
      cpf,
    });
    if (exists?.length) throw new UserExistsError(cpf);
  }
}
