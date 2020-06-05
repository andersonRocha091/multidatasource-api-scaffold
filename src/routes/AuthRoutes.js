const joi = require("@hapi/joi");
const boom = require("boom");
const jwt = require("jsonwebtoken");

const BaseRoute = require("./base/BaseRoute");
const failAction = (request, headers, erro) => {
  throw erro;
};
const USER = {
  username: "lexluthor",
  password: "123",
};

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super();
    this.secret = secret;
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
        if (
          username.toLowerCase() !== USER.username ||
          password !== USER.password
        ) {
          return boom.unauthorized();
        }
        const token = jwt.sign(
          {
            username: username,
            id: 1,
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
