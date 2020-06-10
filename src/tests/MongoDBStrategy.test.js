const assert = require("assert");
const MongoDB = require("../db/strategies/mongodb/MongoDB");
const HeroesSchema = require("../db/strategies/mongodb/schemes/HeroesSchema");
const Context = require("../db/strategies/base/ContextStrategy");

let context = {};
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
    const connection = MongoDB.connect();
    context = new Context(new MongoDB(connection, HeroesSchema));
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
    const result = await context.update(MOCK_HEROI_ATUALIZAR_ID, {
      nome: "Pernalonga",
    });
    assert.deepEqual(result.nModified, 1);
  });

  it("Remove hero", async () => {
    const result = await context.delete(MOCK_HEROI_ATUALIZAR_ID);
    assert.deepEqual(result.n, 1);
  });
});
