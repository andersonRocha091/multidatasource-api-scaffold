const ICrud = require("./interfaces/InterfaceCrud");

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item salvo em mongodb!");
  }
}

module.exports = MongoDB;
