const ICrud = require("./interfaces/InterfaceCrud");

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item salvo em Postgres!");
  }
}

module.exports = Postgres;
