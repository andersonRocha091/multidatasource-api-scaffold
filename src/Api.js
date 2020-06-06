const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const HapiSwagger = require("hapi-swagger");
const HapiJwt = require("hapi-auth-jwt2");

const Context = require("./db/strategies/base/ContextStrategy");
const MongoDB = require("./db/strategies/mongodb/MongoDB");
const Schema = require("./db/strategies/mongodb/schemes/HeroesSchema");
const HeroesRoute = require("./routes/HeroRoutes");
const AuthRoute = require("./routes/AuthRoutes");
const Postgres = require("./db/strategies/postgres/Postgres");
const UserSchema = require("./db/strategies/postgres/schemas/UserSchemaPg");
const JWT_SECRET = "MY_BIG_SECRET_123";

const app = new Hapi.Server({
  port: 5000,
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, Schema));

  const pgConnection = await Postgres.connect();
  const userModel = await Postgres.defineModel(pgConnection, UserSchema);
  const contextPostgres = new Context(new Postgres(pgConnection, userModel));

  const swaggerOptions = {
    info: {
      title: "Test API Documentation",
      apiVersion: "0.0.1",
    },
  };

  await app.register([
    HapiJwt,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  //Creating auth strategy
  app.auth.strategy("jwt", "jwt", {
    key: JWT_SECRET,
    validate: (dado, request) => {
      //Checks if user in database still active
      //Checks it the user still paying
      return {
        isValid: true,
      };
    },
  });

  app.auth.default("jwt");

  try {
    await app.start();
    console.log(`Server running at port ${app.info.port}`);
  } catch (error) {
    console.log("erro", error);
  }
  app.route([
    ...mapRoutes(new HeroesRoute(context), HeroesRoute.methods()),
    ...mapRoutes(
      new AuthRoute(JWT_SECRET, contextPostgres),
      AuthRoute.methods()
    ),
  ]);
  return app;
}

module.exports = main();
