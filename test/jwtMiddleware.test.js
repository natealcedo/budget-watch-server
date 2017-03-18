import authenticateToken from "../src/middleware/authenticateToken";
import bcrypt from "bcrypt";
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";
import mockHttp from "node-mocks-http";
import models from "../src/models";
import mongoose from "mongoose";
import sinon from "sinon";

describe("JWT middleware authentication", () => {
  let token;
  before(done => {
    mongoose.createConnection(process.env.DB);
    bcrypt.hash("Cd5f9d33ee", 10, (err, password_digest) => {
      if(err) {
        throw err;
      }
      const user = new models.User({
        username: "bobbythegreat",
        email: "bobbythegreat@gmail.com",
        password_digest
      });
      user.save().then((user) => {
        jwt.sign({
          username: user.username,
          email: user.email,
          userId: user._id
        }, process.env.JWT, null, (err, signedToken) => {
          if(err) throw err;
          token = signedToken; 
          done();
        }); 
      }).catch(err => {
        throw err;
      });
    });
  });

  after(done => {
    models.User.remove({}).then(() => {
      done();
    });
  });

  describe("Case where no token is provided", () => {
    const next = sinon.spy();
    before((done) => {
      const req = mockHttp.createRequest({
        headers: {
          Authorization: ""
        }
      });
      const res = mockHttp.createResponse();
      authenticateToken(req,res,next);
      setTimeout(done, 100);
    });
    it("should not call next since no token is provided", () => {
      expect(next.called).to.be.false;
    });
  });

  describe("Case where token is invalid", () => {
    const next = sinon.spy();
    before((done) => {
      const req = mockHttp.createRequest({
        headers: {
          Authorization: "Bearer gibberish"
        }
      });
      const res = mockHttp.createResponse();
      authenticateToken(req,res,next);
      setTimeout(done, 100);
    });
    it("should not call next since no token is provided", () => {
      expect(next.called).to.be.false;
    });
  });

  describe("Case where token is valid", () => {
    const next = sinon.spy();
    before((done) => {
      const req = mockHttp.createRequest({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const res = mockHttp.createResponse();
      authenticateToken(req,res,next);
      setTimeout(done, 100);
    });
    it("should call next since token is valid", () => {
      expect(next.called).to.be.true;
    });
  });
});
