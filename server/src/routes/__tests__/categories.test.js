const request = require("supertest");
const app = require("../../index.js");
const runResetDB = require("../../bin/resetdbfunction")

describe("Caegories", () => {

  beforeEach( async () => {
    await runResetDB();
  });

  test("GET /api/categories", async () => {
    await request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => expect(response.body.length).toEqual(2));
  });

})