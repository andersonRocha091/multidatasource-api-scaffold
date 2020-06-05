const assert = require("assert");
const api = require("../Api");

let app = {};
const MOCK_HERO_CADASTRAR = {
  nome: "Chapolin Colorado",
  poder: "Marreta Bionica",
};

const MOCK_HERO_INITIAL = {
  nome: "Gavião arqueiro",
  poder: "mira",
};
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxleEx1dGhvciIsImlkIjoxLCJpYXQiOjE1OTEzMTgxNDR9.10qS7Bt-tt0KR3aogMPdoAGl_dd-3KPuR0TA0DyvqY8";
let MOCK_ID = "";
const headers = {
  Authorization: TOKEN,
};

describe("Api Test Suit", function () {
  this.beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: "POST",
      url: "/heroes",
      headers,
      payload: JSON.stringify(MOCK_HERO_INITIAL),
    });
    const { _id } = JSON.parse(result.payload);
    MOCK_ID = _id;
  });

  it("Heroes /heroes list", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/heroes?skip=0&limit=10",
      headers,
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
      headers,
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
      headers,
    });
    const erroResult = {
      statusCode: 400,
      error: "Bad Request",
      message: '"limit" must be a number',
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
      headers,
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
      headers,
    });
    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, "Hero inserted successfully");
  });

  it("Update Object Partially /heroes/:id", async () => {
    const _id = MOCK_ID;
    const expected = {
      poder: "super mira",
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/heroes/${_id}`,
      headers,
      payload: JSON.stringify(expected),
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Hero updated successfully");
  });

  it("Update Object Partially /heroes/:id - incorrect id not update", async () => {
    const _id = `5ed71b39f5b82cecc4b7e197`;
    const updatedAttribute = {
      poder: "super mira",
    };
    const result = await app.inject({
      method: "PATCH",
      url: `/heroes/${_id}`,
      headers,
      payload: JSON.stringify(updatedAttribute),
    });

    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Cant update hero",
    };

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 412);
    assert.deepEqual(expected, dados);
  });

  it("Delete DELETE /heroes/:id", async () => {
    const _id = MOCK_ID;
    const result = await app.inject({
      method: "DELETE",
      url: `/heroes/${_id}`,
      headers,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Hero removed successfully");
  });

  it("Delete DELETE /heroes/:id - invalid id", async () => {
    const _id = `5ed71b39f5b82cecc4b7e197`;
    const result = await app.inject({
      method: "DELETE",
      url: `/heroes/${_id}`,
      headers,
    });
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Id Not Found",
    };
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(expected, dados);
  });

  it("Delete DELETE /heroes/:id - do not remove data it causes excepection", async () => {
    const _id = `ID_INVALIDO`;
    const result = await app.inject({
      method: "DELETE",
      url: `/heroes/${_id}`,
      headers,
    });
    const expected = {
      error: "Internal Server Error",
      message: "An internal server error occurred",
      statusCode: 500,
    };
    const dados = JSON.parse(result.payload);

    assert.deepEqual(expected, dados);
  });
});
