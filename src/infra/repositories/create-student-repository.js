export default class CreateStudentRepository {
  #postgresHelper;

  constructor(postgresHelper) {
    this.#postgresHelper = postgresHelper;
  }

  async create({ name, email, cpf, status = "active", avatar = "" }) {
    let client;
    try {
      client = await this.#postgresHelper.connect();
      await client.query("BEGIN;");
      await client.query(this.sql, [name, email, cpf, status, avatar]);
      await client.query("COMMIT;");
      return true;
    } catch (error) {
      if (client) {
        await client.query("ROLLBACK;");
      }
      throw error;
    } finally {
      if (client) {
        await this.#postgresHelper.disconnect();
      }
    }
  }

  get sql() {
    return "INSERT INTO my_schema.students (name, email, cpf, status, avatar) VALUES ($1, $2, $3, $4, $5);";
  }
}
