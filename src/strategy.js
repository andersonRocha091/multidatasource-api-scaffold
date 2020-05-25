class NotImplementedException extends Error {
  constructor() {
    super("Not Implemented Exception");
  }
}

class ICrud {
  create(item) {
    throw new NotImplementedException();
  }
  read(query) {
    throw NotImplementedException();
  }
  update(id, item) {
    throw NotImplementedException();
  }
  delete(id) {
    throw NotImplementedException();
  }
}

class MongoDB extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item salvo em mongodb!");
  }
}

class Postgres extends ICrud {
  constructor() {
    super();
  }

  create(item) {
    console.log("Item salvo em Postgres!");
  }
}

class ContextStrategy {
  constructor(strategy) {
    this._database = strategy;
  }
  create(item) {
    return this._database.create(item);
  }
  read(item) {
    return this._database.read(item);
  }
  update(id, item) {
    return this._database.update(id, item);
  }
  delete(id) {
    return this._database.delete(id);
  }
}

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();
contextMongo.read();
