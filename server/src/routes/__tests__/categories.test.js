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
      .expect(200, [{
        id: 1,
        title: "Movies"
      },
      {
        id: 2,
        title: "Canada"
      }
    ])
  });

})