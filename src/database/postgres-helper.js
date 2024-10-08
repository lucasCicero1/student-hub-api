import { Client } from "pg";

class PostgresHelper {
  static client;

  static async connect(config) {
    if (!this.client) {
      this.client = new Client(config);
      await this.client.connect();
    }

    return this.client;
  }

  static async disconnect() {
    await this.client.end();
    this.client = null;
  }
}

export { PostgresHelper };
