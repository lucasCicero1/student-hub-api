export default class ListStudentsRepository {
  #postgresHelper;

  constructor(postgresHelper) {
    this.#postgresHelper = postgresHelper;
  }

  async list(sql, params = null) {
    let client;
    try {
      client = await this.#postgresHelper.connect();
      const { rows } = await client.query(sql, params);
      return rows.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        ra: item.ra,
        cpf: item.cpf,
        status: item.status,
        avatar: item.avatar,
      }));
    } finally {
      if (client) {
        await this.#postgresHelper.disconnect();
      }
    }
  }

  async listStudents() {
    return this.list(this.sql);
  }

  async listStudentByCpf({ cpf }) {
    return this.list(this.sqlWithCpf, [cpf]);
  }

  get sql() {
    return "SELECT id, name, email, ra, cpf, status, avatar FROM my_schema.students";
  }

  get sqlWithCpf() {
    return "SELECT id, name, email, ra, cpf, status, avatar FROM my_schema.students WHERE cpf = $1";
  }
}
