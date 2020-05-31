const Hapi = require("hapi");

const Context = require("./db/strategies/base/ContextStrategy");
const MongoDB = require("./db/strategies/mongodb/MongoDB");
const Schema = require("./db/strategies/mongodb/schemes/HeroesSchema");
const HeroesRoute = require("./routes/HeroRoutes");
const app = new Hapi.Server({
  port: 5000,
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, Schema));

  app.route([...mapRoutes(new HeroesRoute(context), HeroesRoute.methods())]);

  await app.start();
  console.log(`Server running at port ${app.info.port}`);
  return app;
}

module.exports = main();
