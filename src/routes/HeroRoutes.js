const joi = require("joi");

const BaseRoute = require("./base/BaseRoute");
const failAction = (request, headers, erro) => {
  throw erro;
};

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
          failAction,
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
          const query = { nome: { $regex: `.*${name}*.` } };
          return this.db.read(name ? query : {}, skip, limit);
        } catch (error) {
          return "Erro interno no servidor";
        }
      },
    };
  }

  create() {
    return {
      path: "/heroes",
      method: "POST",
      config: {
        validate: {
          failAction,
          payload: {
            nome: joi.string().required().min(3).max(100),
            poder: joi.string().required().min(2).max(20),
          },
        },
      },
      handler: async request => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            message: "Hero inserted successfully",
            _id: result._id,
          };
        } catch (error) {
          console.log("deu ruim", erro);
          return "Internal Error";
        }
      },
    };
  }
}

module.exports = HeroRoutes;
