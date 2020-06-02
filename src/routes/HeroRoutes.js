const BaseRoute = require("./base/BaseRoute");

class HeroRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  list() {
    return {
      path: "/heroes",
      method: "GET",
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query;
          let query = {};
          if (name) {
            query.nome = name;
          }

          if (isNaN(skip)) {
            throw Error(`Incorrect skip=${skip} type, it must be Int`);
          }
          if (isNaN(limit)) {
            throw Error(`Incorrect limit=${limit} type, it must be Int`);
          }
          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (error) {
          return "Erro interno no servidor";
        }
      },
    };
  }
}

module.exports = HeroRoutes;
