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
        name: item.name,
        email: item.email,
        ra: item.ra,
        cpf: item.cpf,
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
    return "SELECT name, email, ra, cpf FROM my_schema.students";
  }

  get sqlWithCpf() {
    return "SELECT name, email, ra, cpf FROM my_schema.students WHERE cpf = $1";
  }
}
