const ICrud = require("../interfaces/InterfaceCrud");
const Mongoose = require("mongoose");
const STATUS = {
  0: "Disconected",
  1: "Connecting",
  2: "Connected",
  3: "Disconnecting",
};

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();
    this._schema = schema;
    this._connection = connection;
  }

  /**
   * 0: disconected
   * 1: connecting
   * 2: connected
   * 3: disconnecting
   */
  async isConnected() {
    const state = STATUS[this._connection.readyState];
    if (state === "Connected") return state;
    if (state !== "Connecting") return state;
    await new Promise(resolve => setTimeout(resolve, 3000));
    return STATUS[this._connection.readyState];
  }

  static connect() {
    Mongoose.connect(
      "mongodb://anderson:anderson@localhost:27017/heroes",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (error) {
        if (!error) {
          return;
        }
        console.log("Falha na conexão", error);
      }
    );
    const connection = Mongoose.connection;
    connection.once("open", () => console.log("database rodando"));
    return connection;
  }

  create(item) {
    return this._schema.create(item);
  }

  read(item, skip = 0, limit = 10) {
    return this._schema.find(item).skip(skip).limit(limit);
  }
  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
