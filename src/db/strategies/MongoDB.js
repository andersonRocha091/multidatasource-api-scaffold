const ICrud = require("./interfaces/InterfaceCrud");
const Mongoose = require("mongoose");
const STATUS = {
  0: "Disconected",
  1: "Connecting",
  2: "Connected",
  3: "Disconnecting",
};

class MongoDB extends ICrud {
  constructor() {
    super();
    this._herois = null;
    this._driver = null;
  }

  /**
   * 0: disconected
   * 1: connecting
   * 2: connected
   * 3: disconnecting
   */
  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === "Connected") return state;
    if (state !== "Connecting") return state;
    await new Promise(resolve => setTimeout(resolve, 3000));
    return STATUS[this._driver.readyState];
  }

  defineModel() {
    const heroeSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true,
      },
      poder: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      },
    });

    this._herois = Mongoose.model("heroes", heroeSchema);
  }

  connect() {
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
    this._driver = Mongoose.connection;
    this._driver.once("open", () => console.log("database rodando"));
    this.defineModel();
  }

  create(item) {
    return this._herois.create(item);
  }

  read(item, skip = 0, limit = 10) {
    return this._herois.find(item).skip(skip).limit(limit);
  }
  update(id, item) {
    console.log("id: ", id);
    return this._herois.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return this._herois.deleteOne({ _id: id });
  }
}

module.exports = MongoDB;
