const joi = require("joi");
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
      config: {
        validate: {
          failAction: (request, headers, erro) => {
            throw erro;
          },
          query: {
            skip: joi.number().integer().default(0),
            limit: joi.number().integer().default(10),
            name: joi.string().min(3).max(100),
          },
        },
      },
      handler: (request, headers) => {
        try {
          const { skip, limit, name } = request.query;
          let query = {};
          if (name) {
            query.nome = name;
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
