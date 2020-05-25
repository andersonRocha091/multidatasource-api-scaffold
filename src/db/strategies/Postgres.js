const Sequelize = require("sequelize");

const ICrud = require("./interfaces/InterfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._herois = null;
    this._connect();
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

  _connect() {
    this._driver = new Sequelize("heroes", "anderson", "anderson", {
      host: "localhost",
      dialect: "postgres",
      quoteIdentifiers: false,
      operatorAliases: false,
    });
  }
  async defineModel() {
    this._herois = driver.define(
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
  create(item) {
    console.log("Item salvo em Postgres!");
  }
}

module.exports = Postgres;
