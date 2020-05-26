const Sequelize = require("sequelize");

const ICrud = require("./interfaces/InterfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
  }
  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.log("fail", error);
      return false;
    }
  }

  async connect() {
    this._driver = new Sequelize("heroes", "anderson", "anderson", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false,
    });
    await this.defineModel();
  }
  async defineModel() {
    this._herois = this._driver.define(
      "heroes",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: {
          type: Sequelize.STRING,
          required: true,
        },
        poder: {
          type: Sequelize.STRING,
          required: true,
        },
      },
      {
        tableName: "TB_HEROES",
        freezeTableName: false,
        timestamps: false,
      }
    );

    await this._herois.sync();
  }
  async create(item) {
    return this._herois.create(item, { raw: true });
  }

  async read(item = {}) {
    return this._herois.findAll({ where: item, raw: true });
  }
  async update(id, item) {
    return this._herois.update(item, { where: { id: id } });
  }
}

module.exports = Postgres;
