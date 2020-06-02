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
          let query = !name ? {} : { name };

          return this.db.read(query, parseInt(skip), parseInt(limit));
        } catch (error) {
          console.log("DEU RUIM", error);
          return "Erro interno no servidor";
        }
      },
    };
  }
}

module.exports = HeroRoutes;
