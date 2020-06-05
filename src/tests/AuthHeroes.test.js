const assert = require("assert");
const api = require("../Api");
let app = {};

const AuthRoutes = require("../routes/AuthRoutes");
const JWT_SECRET = "MY_BIG_SECRET_123";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxleEx1dGhvciIsImlkIjoxLCJpYXQiOjE1OTEzMTgxNDR9.10qS7Bt-tt0KR3aogMPdoAGl_dd-3KPuR0TA0DyvqY8";

describe.only("Auth test suite", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Obtain an Token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "LexLuthor",
        password: "123",
      },
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });
});
