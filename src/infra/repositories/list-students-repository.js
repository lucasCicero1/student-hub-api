export default class ListStudentsRepository {
  #postgresHelper;

  constructor(postgresHelper) {
    this.#postgresHelper = postgresHelper;
  }

  async list() {
    let client;
    try {
      client = await this.#postgresHelper.connect();
      const { rows } = await client.query(this.sql);
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

  get sql() {
    return "SELECT name, email, ra, cpf FROM my_schema.students";
  }
}
