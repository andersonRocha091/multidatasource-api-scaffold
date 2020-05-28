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
  isConnected() {
    throw NotImplementedException();
  }
  connect() {
    throw NotImplementedException();
  }
}

module.exports = ICrud;
