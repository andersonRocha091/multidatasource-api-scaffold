const assert = require("assert");
const Postgres = require("../db/strategies/postgres/Postgres");
const HeroesSchema = require("../db/strategies/postgres/schemas/HeroesSchemaPg");
const Context = require("../db/strategies/base/ContextStrategy");

const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "Flechas" };
const MOCK_HEROI_ATUALIZAR = { nome: "Mulher Maravilha", poder: "Divindade" };
let context = {};

describe("Postgres Strategy", function () {
  this.timeout(Infinity);
  this.beforeAll(async function () {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroesSchema);
    context = new Context(new Postgres(connection, model));
    await context.delete();
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

  it("Deletando por id", async function () {
    const [item] = await context.read({});
    const result = await context.delete(item.id);
    assert.deepEqual(result, 1);
  });
});
