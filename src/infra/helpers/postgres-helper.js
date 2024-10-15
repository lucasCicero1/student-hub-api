import { Client } from "pg";

class PostgresHelper {
  #configs;

  client;

  constructor(configs) {
    this.#configs = configs;
  }

  async connect() {
    if (!this.client) {
      this.client = new Client(this.#configs);
      await this.client.connect();
    }

    return this.client;
  }

  async disconnect() {
    if (this.client) await this.client.end();
    this.client = null;
  }
}

export { PostgresHelper };
