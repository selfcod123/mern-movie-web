//---File  13 Back

// Execution Order:
// Sign-Up:
// User submits registration data (POST /api/v1/users/signup).
// signup validates, creates a user, and responds with a JWT.
// Sign-In:
// User submits credentials (POST /api/v1/users/signin).
// signin authenticates and responds with a JWT.
// Get Info / Update Password:
// User makes an authenticated request (GET /api/v1/users/info, PUT /api/v1/users/password).
// auth middleware verifies the JWT and attaches the user to req.
// Controller retrieves or updates user data.

// Summary:
// Purpose: Handles user registration, authentication, profile retrieval, and password updates.
// Execution Flow:
// Validates inputs.
// Interacts with the database (userModel).
// Sends responses using responseHandler.
// Dependencies: Relies on userModel for data storage and jsonwebtoken for token management.

import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser) return responseHandler.badrequest(res, "username already used");

    const user = new userModel();

    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select("username password salt id displayName");

    if (!user) return responseHandler.badrequest(res, "User not exist");

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id
    });
  } catch {
    responseHandler.error(res);
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel.findById(req.user.id).select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password)) return responseHandler.badrequest(res, "Wrong password");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword
};
