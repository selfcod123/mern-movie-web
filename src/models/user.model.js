//---File  9 Back
// Execution Order:
// This file is executed when the User model is imported and used in the application.
// Passwords are hashed during user registration (using setPassword).
// Password validation occurs during login (using validPassword).

// Summary:
// Purpose: Defines the schema for users, manages password hashing and validation, and ensures secure storage of user data.
// Execution Order in Project: Runs when the User model is imported and used in authentication workflows or user-related features.
// Dependencies: Uses mongoose for schema creation, model.options.js for behavior configuration, and crypto for secure password handling.

import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  salt: {
    type: String,
    required: true,
    select: false
  }
}, modelOptions);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    "sha512"
  ).toString("hex");

  return this.password === hash;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
