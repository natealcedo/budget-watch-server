import app from "../src/app";
import bcrypt from "bcrypt";
import chai, { expect } from "chai";
import chaitHttp from "chai-http";
import models from "../src/models";
import mongoose from "mongoose";
import signup from "../src/validations/signup";

chai.use(chaitHttp);

describe("Sign up Validations", () => {
  before(() => {
    mongoose.createConnection(process.env.DB);
    const user = new models.User({
      username: "ndaljr",
      password_digest: "Cd5f9d33ee",
      email: "ndaljr@gmail.com"
    });
    return user.save().catch(err => {
      throw err;
    });
  });

  after(() => {
    return models.User.remove({}).then(() => {
      mongoose.disconnect();
    }).catch(err => {
      throw err;
    }); 
  });

  describe("All fields are empty", () => {
    it("isValid should return false with full errors", () => {
      const data = {
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors).to.not.be.empty;
        expect(errors.username).to.equal("username is required");
        expect(errors.email).to.equal("email is required");
        expect(errors.password).to.equal("password is required");
        expect(errors.passwordConfirm).to.equal("password is required");
      });
    });
  });

  describe("Username and email is not filled, passwords match", () => {
    it("isValid should return false and errors is not empty", () => {
      const data = {
        username: "",
        email: "",
        password: "Cd5f9d33ee",
        passwordConfirm: "Cd5f9d33ee"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors).to.not.be.empty;
        expect(errors.username).to.equal("username is required");
        expect(errors.email).to.equal("email is required");
      });
    });
  });

  describe("Username and email is filled, email exists, passwords match", () => {
    it("isValid should return false and errors is not empty", () => {
      const data = {
        username: "",
        email: "ndaljr@gmail.com",
        password: "Cd5f9d33ee",
        passwordConfirm: "Cd5f9d33ee"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors).to.not.be.empty;
        expect(errors.username).to.equal("username is required");
        expect(errors.email).to.equal("email exists");
      });
    });
  });

  describe("All fields are filled, email wrong format, username < 5 chars, passwords < 8 chars", () => {
    it("isValid should return false and errors should inlude short inputs", () => {
      const data = {
        username: "s",
        email: "bobgmail.com",
        password: "s",
        passwordConfirm: "g"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(errors.email).to.equal("must be a valid email address");
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors).to.not.be.empty;
        expect(errors.password).to.equal("password should be a minimum length of 8 characters");
        expect(errors.passwordConfirm).to.equal("password should be a minimum length of 8 characters");
      });
    });
  });

  describe("All fields are filled, username and email dont exist passwords < 8 chars", () => {
    it("isValid should return false and errors should inlude short inputs", () => {
      const data = {
        username: "bobthebest",
        email: "bob@gmail.com",
        password: "s",
        passwordConfirm: "g"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(errors.email).to.be.undefined;
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors).to.not.be.empty;
        expect(errors.password).to.equal("password should be a minimum length of 8 characters");
        expect(errors.passwordConfirm).to.equal("password should be a minimum length of 8 characters");
      });
    });
  });

  describe("All fields are filled, username and email exist passwords < 8 chars", () => {
    it("isValid should return false and errors should inlude short inputs", () => {
      const data = {
        username: "ndaljr",
        email: "ndaljr@gmail.com",
        password: "s",
        passwordConfirm: "g"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(errors.email).to.equal("email exists");
        expect(errors.username).to.equal("user exists");
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors).to.not.be.empty;
        expect(errors.password).to.equal("password should be a minimum length of 8 characters");
        expect(errors.passwordConfirm).to.equal("password should be a minimum length of 8 characters");
      });
    });
  });

  describe("Username and email is not filled, passwords do not match", () => {
    it("isValid should return false and errors is not empty", () => {
      const data = {
        username: "",
        email: "",
        password: "Cd5f9d33ees",
        passwordConfirm: "Cd5f9d33ee"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors).to.not.be.empty;
        expect(errors.username).to.equal("username is required");
        expect(errors.email).to.equal("email is required");
        expect(errors.passwordConfirm).to.equal("passwords must match");
      });
    });
  });
  
  describe("username and email exists, passwords match", () => {
    it("isValid should return false with user exists", () => {
      const data = {
        username: "ndaljr",
        email: "ndaljr@gmail.com",
        password: "Cd5f9d33ee",
        passwordConfirm: "Cd5f9d33ee"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors.username).to.equal("user exists");
        expect(errors.email).to.equal("email exists");
      }).catch(err => {
        throw err;
      });
    });
  }); 

  describe("username and email exists, passwords do not match", () => {
    it("isValid should return false with user exists", () => {
      const data = {
        username: "ndaljr",
        email: "ndaljr@gmail.com",
        password: "Cd5f9d33ee",
        passwordConfirm: "Cd5f9d33ese"
      };
      return signup(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.false;
        expect(errors).to.be.an.object;
        expect(errors.username).to.equal("user exists");
        expect(errors.email).to.equal("email exists");
        expect(errors.passwordConfirm).to.equal("passwords must match");
      }).catch(err => {
        throw err;
      });
    });
  }); 

  describe("All fields are filled and none of the fields exist in the database", () => {
    const data = {
      username: "natethegreat",
      email: "natethegreat@gmail.com",
      password: "Cd5f9d33ee",
      passwordConfirm: "Cd5f9d33ee"
    };
    it("isValid should return true with no errors", () => {
      return signup(data).then(({ isValid, errors }) => {
        expect(isValid).to.be.true;
        expect(errors).to.be.an.object;
        expect(errors).to.be.empty;
      }).catch(err => {
        throw err;
      });
    });
  });
});
