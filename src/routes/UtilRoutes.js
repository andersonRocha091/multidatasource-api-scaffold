const joi = require("@hapi/joi");
const { join } = require("path");
const boom = require("boom");
const jwt = require("jsonwebtoken");

const BaseRoute = require("./base/BaseRoute");

const failAction = (request, headers, erro) => {
  throw erro;
};

class UtilRoutes extends BaseRoute {
  coverage() {
    return {
      path: "/coverage/{param*}",
      method: "GET",
      config: {
        auth: false,
      },
      handler: {
        directory: {
          path: join(__dirname, "../../coverage"),
          redirectToSlash: true,
          index: true,
        },
      },
    };
  }
}

module.exports = UtilRoutes;
