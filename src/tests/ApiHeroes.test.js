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
      url: "/heroes",
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
      url: `/heroes?skip=0&limit=${TAMANHO_LIMITE}`,
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === 10);
  });
});
