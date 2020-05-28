const assert = require("assert");
const MongoDB = require("../db/strategies/MongoDB");
const Context = require("../db/strategies/base/ContextStrategy");

const context = new Context(new MongoDB());

describe("MongoDB test suit", function () {
  this.beforeAll(async function () {
    await context.connect();
  });

  it("MongoDB Connection", async () => {
    const result = await context.isConnected();
    const expected = "Connected";
    assert.deepEqual(result, expected);
  });
});
