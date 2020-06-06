const joi = require("@hapi/joi");
const boom = require("boom");
const jwt = require("jsonwebtoken");

const BaseRoute = require("./base/BaseRoute");
const PasswordHelper = require("../helpers/PasswordHelper");

const failAction = (request, headers, erro) => {
  throw erro;
};
const USER = {
  username: "lexluthor",
  password: "123",
};

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
  }
  login() {
    return {
      path: "/login",
      method: "POST",
      options: {
        auth: false,
        validate: {
          failAction,
          payload: joi.object({
            username: joi.string().required(),
            password: joi.string().required(),
          }),
        },
      },
      handler: async request => {
        const { username, password } = request.payload;

        const [user] = await this.db.read({
          username: username.toLowerCase(),
        });

        if (!user) {
          return boom.unauthorized("User or Password invalid");
        }
        const match = PasswordHelper.comparePassword(password, user.password);
        if (!match) {
          return boom.unauthorized("User or Password invalid");
        }

        const token = jwt.sign(
          {
            username: username,
            id: user.id,
          },
          this.secret
        );
        return {
          token,
        };
      },
    };
  }
}

module.exports = AuthRoutes;
