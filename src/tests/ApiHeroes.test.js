const assert = require("assert");
const api = require("../Api");
let app = {};

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

    assert.deepEqual(result.payload, "Erro interno no servidor");
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
});
