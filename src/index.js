const ContextStrategy = require("./db/strategies/base/ContextStrategy");
const MongoDB = require("./db/strategies/MongoDB");
const Postgres = require("./db/strategies/Postgres");

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
