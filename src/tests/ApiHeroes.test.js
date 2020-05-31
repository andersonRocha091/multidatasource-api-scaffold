const assert = require("assert");
const api = require("../Api");
let app = {};

describe("Api Test Suit", function () {
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
});
