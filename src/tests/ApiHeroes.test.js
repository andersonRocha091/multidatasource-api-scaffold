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

  it("List /heroes - must return only 10 records", async () => {
    const LIMIT_SIZE = 10;
    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === 10);
  });

  it("List /heroes - must return error", async () => {
    const LIMIT_SIZE = "AEEE";

    const result = await app.inject({
      method: "GET",
      url: `/heroes?skip=0&limit=${LIMIT_SIZE}`,
    });

    const statusCode = result.statusCode;
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
