const assert = require("assert");
const Postgres = require("../db/strategies/Postgres");
const Context = require("../db/strategies/base/ContextStrategy");

const context = new Context(new Postgres());

describe("Postgres Strategy", function () {
  this.timeout(Infinity);

  it("PostgresSQL Connection", async function () {
    const result = await context.isConnected();
    assert.equal(result, true);
  });
});
