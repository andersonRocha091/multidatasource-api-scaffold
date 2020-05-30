const assert = require("assert");
const MongoDB = require("../db/strategies/MongoDB");
const Context = require("../db/strategies/base/ContextStrategy");

const context = new Context(new MongoDB());
const MOCK_HEROI_CADASTRAR = {
  nome: "Batman",
  poder: "Dinheiro",
};
const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino-${Date.now()}`,
  poder: "Velocidade",
};
let MOCK_HEROI_ATUALIZAR_ID = "";
describe("MongoDB test suit", function () {
  this.timeout(15000);
  this.beforeAll(async () => {
    await context.connect();
  });

  it("MongoDB Connection", async () => {
    const result = await context.isConnected();
    const expected = "Connected";
    const { _id } = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_HEROI_ATUALIZAR_ID = _id;
    assert.deepEqual(result, expected);
  });

  it("MongoDB inserting new item", async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });

  it("Listing item", async () => {
    const [{ nome, poder }] = await context.read(
      {
        nome: MOCK_HEROI_CADASTRAR.nome,
      },
      0,
      10
    );

    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });

  it("Update a Hero", async () => {
    console.log(MOCK_HEROI_ATUALIZAR_ID);
    const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {
      nome: "Pernalonga",
    });
    assert.deepEqual(result.nModified, 1);
  });

  it("Remove hero", async () => {
    const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID);
    console.log(result);
    assert.deepEqual(result.n, 1);
  });
});
