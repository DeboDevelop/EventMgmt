require("dotenv").config();
let mongoose = require("mongoose");
let Event = require("../Models/event");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

let token = "Bearer " + process.env.TEST_TOKEN;

chai.use(chaiHttp);

describe("Events", () => {
  beforeEach((done) => {
    Event.deleteMany({}, (err) => {
      done();
    });
  });
  describe("/GET Event", () => {
    it("it should GET all the events", (done) => {
      chai
        .request(server)
        .get("/api/event")
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  describe("/POST event", () => {
    it("it should POST a event", (done) => {
      let myEvent = {
        event_name: "Wake up",
        user: "test",
        description: "Wake me up",
        date_and_time: new Date().getTime(),
      };
      chai
        .request(server)
        .post("/api/event")
        .set("Authorization", token)
        .send(myEvent)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
