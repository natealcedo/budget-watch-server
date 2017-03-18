import bcrypt from "bcrypt";
import authenticate from "../src/validations/authentication";
import chai, { expect } from "chai";
import mongoose from "mongoose";
import models from "../src/models";

describe("Authentication validation", () => {
  before((done) => {
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
      return user.save().then((user) => {
        console.log("BEFORE!");
        done();
      });
    });
  });

  after(() => {
    return models.User.remove({}).then(() => {
      console.log("AFTER");
    }).catch(err => {
      throw err;
    });
  });

  describe("User does not exist", () => {
    it("there should be a user", () => {
      return models.User.find({}).then(res => {
        expect(res[0]).to.be.an.object;
        expect(res[0]).to.have.property("username");
      });
    });
  });
});
