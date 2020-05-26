const assert = require("assert");
const Postgres = require("../db/strategies/Postgres");
const Context = require("../db/strategies/base/ContextStrategy");

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "Flechas" };

describe("Postgres Strategy", function () {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    await context.connect();
  });

  it("PostgresSQL Connection", async function () {
    const result = await context.isConnected();
    assert.equal(result, true);
  });

  it("Cadastrar Heroi", async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    const { nome, poder } = result;
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });
});
