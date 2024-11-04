export default class DeleteStudentRepository {
  #postgresHelper;

  constructor(postgresHelper) {
    this.#postgresHelper = postgresHelper;
  }

  async delete({ cpf }) {
    let client;
    try {
      client = await this.#postgresHelper.connect();
      await client.query("BEGIN;");
      await client.query(this.sql, [cpf]);
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
    return "DELETE FROM my_schema.students WHERE cpf = $1";
  }
}
