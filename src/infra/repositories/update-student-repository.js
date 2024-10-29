export default class UpdateStudentRepository {
  #postgresHelper;

  constructor(postgresHelper) {
    this.#postgresHelper = postgresHelper;
  }

  async update({ name, email, cpf }) {
    let client;
    try {
      client = await this.#postgresHelper.connect();
      await client.query("BEGIN;");
      await client.query(this.sql, [name, email, cpf]);
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
    return `
      UPDATE
        my_schema.students
      SET
        (name, email) = ($1, $2)
      WHERE
        cpf = $3
    `;
  }
}