const Sequelize = require("sequelize");

const ICrud = require("../interfaces/InterfaceCrud");

class Postgres extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }
  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.log("fail", error);
      return false;
    }
  }

  static async connect() {
    const connection = new Sequelize(process.env.POSTGRES_URL, {
      quoteIdentifiers: false,
      operatorAliases: false,
      logging: false,
      ssl: process.env.SSL_DB,
      dialectOptions: {
        ssl: process.env.SSL_DB,
        rejectUnauthorized: false,
      },
    });
    return connection;
  }
  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }
  async create(item) {
    return this._schema.create(item, { raw: true });
  }

  async read(item = {}) {
    return this._schema.findAll({ where: item, raw: true });
  }
  async update(id, item, upsert) {
    const fn = upsert ? "upsert" : "update";
    const query = upsert ? { returning: true } : { where: { id: id } };
    return this._schema[fn](item, query);
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }
}

module.exports = Postgres;
