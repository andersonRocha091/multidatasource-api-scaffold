const assert = require("assert");
const MongoDB = require("../db/strategies/MongoDB");
const Context = require("../db/strategies/base/ContextStrategy");

const context = new Context(new MongoDB());
const MOCK_HEROI_CADASTRAR = {
  nome: "Batman",
  poder: "Dinheiro",
};

describe("MongoDB test suit", function () {
  this.beforeAll(async function () {
    await context.connect();
    await context.create();
  });

  it("MongoDB Connection", async () => {
    const result = await context.isConnected();
    const expected = "Connected";
    assert.deepEqual(result, expected);
  });

  it("MongoDB inserting new item", async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });
});
