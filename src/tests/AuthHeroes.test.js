const assert = require("assert");
const api = require("../Api");
const Context = require("../db/strategies/base/ContextStrategy");
const Postgres = require("../db/strategies/postgres/Postgres");
const UserSchema = require("../db/strategies/postgres/schemas/UserSchemaPg");
let app = {};

const AuthRoutes = require("../routes/AuthRoutes");
const JWT_SECRET = "MY_BIG_SECRET_123";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxleEx1dGhvciIsImlkIjoxLCJpYXQiOjE1OTEzMTgxNDR9.10qS7Bt-tt0KR3aogMPdoAGl_dd-3KPuR0TA0DyvqY8";
const USER = {
  username: "lexluthor",
  password: "123",
};
const USER_DB = {
  ...USER,
  password: "$2b$04$DZlMvkDykAmmUf7ZXdiqQOU001YpDK1uWpWJxBBvRn4UZbvs/JZx.",
};
let contextPg = {};

describe("Auth test suite", function () {
  this.timeout(15000);
  this.beforeAll(async () => {
    app = await api;
    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(connectionPostgres, UserSchema);
    contextPg = new Context(new Postgres(connectionPostgres, model));
    const resultado = await contextPg.update(null, USER_DB, true);
  });

  it("Obtain an Token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
});
