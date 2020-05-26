const assert = require("assert");
const Postgres = require("../db/strategies/Postgres");
const Context = require("../db/strategies/base/ContextStrategy");

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "Flechas" };
const MOCK_HEROI_ATUALIZAR = { nome: "Mulher Maravilha", poder: "Divindade" };

describe("Postgres Strategy", function () {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    await context.connect();
    await context.create(MOCK_HEROI_ATUALIZAR);
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

  it("Listar Herois", async function () {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it("Atualizar Heroi", async function () {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZAR.nome,
    });
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: "Capitã Marvel",
    };
    const [result] = await context.update(itemAtualizar.id, novoItem);
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.nome, novoItem.nome);
  });
});
