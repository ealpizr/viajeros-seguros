import sql from "mssql";
import process from "process";

class Database {
  static _config = {
    user: "cenfotec_fundamentos_bd",
    password: "Zt32en2Bmz6V#JzD#hBFFvCK9mby^D8BjHE9$XctLdVWmdLjoV",
    database: "ViajerosSeguros",
    server: "sql.ealpizar.com",
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };

  static async connect() {
    if (this.connection) return;

    try {
      this.connection = await sql.connect(this._config);
    } catch (error) {
      console.error("Could not connect to SQL Server: ", error);
      process.exit(1);
    }
  }

  static async query(query) {
    const result = await sql.query(query);
    return result.recordset;
  }

  static async execute(query) {
    await sql.query(query);
  }
}

export default Database;
