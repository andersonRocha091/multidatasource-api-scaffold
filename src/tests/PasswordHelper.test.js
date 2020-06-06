const assert = require("assert");
const passwordHelper = require("../helpers/PasswordHelper");
const SENHA = "anderson@123123";
const HASH = "$2b$04$gzgtwrDWdiBhB1PxSZwiee9KJ8IfDJFZgzd04cDV1aGMJy1fUNIxa";

describe.only("User Helper test suite", function () {
  it("Must generate a hash from a password", async () => {
    const result = await passwordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10);
  });

  it("Must validate password and it hash", async () => {
    const result = await passwordHelper.comparePassword(SENHA, HASH);
    assert.ok(result);
  });
});
