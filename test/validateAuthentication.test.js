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
        done();
      });
    });
  });

  after((done) => {
    models.User.remove({}).then(() => {
      done();
    }).catch(err => {
      throw err;
    });
  });

  describe("Setup Database before testing", () => {
    it("there should be a user", () => {
      return models.User.find({}).then(res => {
        expect(res[0]).to.be.an.object;
        expect(res[0]).to.have.property("username");
        expect(res[0].username).to.equal("bobbythegreat");
      });
    });
  });

  describe("Case: both fields are empty", () => {
    it("isValid should be false and errors should be an object", () => {
      const data = {
        userInput: "",
        password: ""
      };
      return authenticate(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.obect;
        expect(errors).to.not.be.empty;
        expect(errors.userInput).to.equal("username is required");
        expect(errors.password).to.equal("password is required");
      }).catch(err => {
        throw err;
      });
    });
  });

  describe("Case where userInput is empty but password is not", () => {
    it("isValid should be false and errors.userInput should have an error", () => {
      const data = {
        userInput: "",
        password: "Cd5f9d33ee"
      };
      return authenticate(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.obect;
        expect(errors).to.not.be.empty;
        expect(errors.password).to.be.undefined;
        expect(errors.userInput).to.equal("username is required");
      }).catch(err => {
        throw err;
      });
    }); 
  });

  describe("Case where password is empty but userInput is valid", () => {
    it("isValid should be false and errors.password should have an error", () => {
      const data = {
        userInput: "bobbythegreat",
        password: ""
      };
      return authenticate(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.obect;
        expect(errors).to.not.be.empty;
        expect(errors.userinput).to.be.undefined;
        expect(errors.password).to.equal("password is required");
      }).catch(err => {
        throw err;
      });
    }); 
  });

  describe("Case where password is invalid but userInput is valid", () => {
    it("isValid should be false and errors.password should have an error", () => {
      const data = {
        userInput: "bobbythegreat",
        password: "sdfs"
      };
      return authenticate(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.obect;
        expect(errors).to.not.be.empty;
        expect(errors.userinput).to.be.undefined;
        expect(errors.password).to.equal("invalid password");
      }).catch(err => {
        throw err;
      });
    }); 
  });

  describe("Case where credentials are invalid", () => {
    it("isValid should be false and errors.userInput should be not exist", () => {
      const data = {
        userInput: "nasdfjl",
        password: "Cd5f9d33ee"
      };
      return authenticate(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.obect;
        expect(errors).to.not.be.empty;
        expect(errors.password).to.be.undefined;
        expect(errors.userInput).to.equal("username or email does not exist");
      }).catch(err => {
        throw err;
      });
    }); 
  });

  describe("Case where credentials are valid", () => {
    it("isValid should be true and errors should be an empty object", () => {
      const data = {
        userInput: "bobbythegreat",
        password: "Cd5f9d33ee"
      };
      return authenticate(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.true;
        expect(errors).to.be.an.obect;
        expect(errors).to.be.empty;
        expect(errors.password).to.be.undefined;
        expect(errors.userInput).to.be.undefined;
      }).catch(err => {
        throw err;
      });
    }); 
  });
});
