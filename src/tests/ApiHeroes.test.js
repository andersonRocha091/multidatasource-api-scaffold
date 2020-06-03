const assert = require("assert");
const api = require("../Api");
let app = {};
const MOCK_HERO_CADASTRAR = {
  nome: "Chapolin Colorado",
  poder: "Marreta Bionica",
};

describe.only("Api Test Suit", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Heroes /heroes list", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/heroes?skip=0&limit=10",
    });
    const dados = JSON.parse(result.payload);

    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("List /heroes - must return only 3 records", async () => {
    const LIMIT_SIZE = 3;
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === LIMIT_SIZE);
  });

  it("List /heroes - must return error when limit is invalid", async () => {
    const LIMIT_SIZE = "AEEE";

    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
    });
    const erroResult = {
      statusCode: 400,
      error: "Bad Request",
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: { source: "query", keys: ["limit"] },
    };
    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(erroResult));
  });

  it("List /heroes - must filter by name", async () => {
    const LIMIT_SIZE = 1000;
    const NAME = "Patolino";
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}&name=${NAME}`,
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados[0].nome === NAME);
  });

  it("Cadastrar POST - /Heroes", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/heroes",
      payload: MOCK_HERO_CADASTRAR,
    });
    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Hero inserted successfully");
  });
});
