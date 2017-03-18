import chai, { expect } from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import app from "../src/app";

chai.use(chaiHttp);

describe("Server Configruration", () => {
  let server;
  it("the node environment should be a test", () => {
    expect(process.env.NODE_ENV).to.equal("test");
  });

  it("the database used should be a dummy one", () => {
    expect(process.env.DB).to.equal("mongodb://localhost:27017/test");
  });

  describe("Basic connections to root route", () => {
    before(() => {
      server = app.listen(process.env.PORT);
    });
    after(() => {
      server.close();
    });

    describe("/ route", () => {
      it("should return a 404 status to a GET request", (done) => {
        chai
          .request(app)
          .get("/") 
          .end((err,res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an.object;
            expect(res.body.error).to.equal("Resource not found");
            done();
          });
      });

      it("should return a 404 status to a POST request", (done) => {
        chai
          .request(app)
          .post("/") 
          .end((err,res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an.object;
            expect(res.body.error).to.equal("Resource not found");
            done();
          });
      });

      it("should return a 404 status to a DELETE request", (done) => {
        chai
          .request(app)
          .delete("/") 
          .end((err,res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an.object;
            expect(res.body.error).to.equal("Resource not found");
            done();
          });
      });

      it("should return a 404 status to a DELETE request", (done) => {
        chai
          .request(app)
          .put("/") 
          .end((err,res) => {
            expect(res.status).to.equal(404);
            expect(res.body).to.be.an.object;
            expect(res.body.error).to.equal("Resource not found");
            done();
          });
      });
    });
  });
});
