//---File  12 Back
// Execution Order:
// Client Makes a Request:

// Sends a request with an Authorization header containing the JWT (Bearer <token>).
// Middleware Execution:

// auth middleware is triggered.
// Decodes and verifies the token using tokenDecode.
// If valid, retrieves the user and attaches it to req.user.
// Proceeds to the next middleware or route handler.
// Route Handler Execution:

// If authentication is successful, the route handler executes with access to the authenticated user's data.

// Summary:
// Purpose: Ensures secure access to protected routes using JWT-based authentication.
// Execution Order in Project: Executes before route handlers in protected routes.
// Dependencies: Relies on jsonwebtoken for token verification, userModel for retrieving user data, and responseHandler for handling errors.

import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      return jsonwebtoken.verify(
        token,
        process.env.TOKEN_SECRET
      );
    }

    return false;
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
    try {
      console.log("Auth middleware triggered.");

      const tokenDecoded = tokenDecode(req);

      if (!tokenDecoded) {
        console.error("Token decode failed. Authorization header:", req.headers["authorization"]);
        return responseHandler.unauthorize(res);
      }

      const user = await userModel.findById(tokenDecoded.data);

      if (!user) {
        console.error("User not found for decoded token:", tokenDecoded.data);
        return responseHandler.unauthorize(res);
      }

      console.log("User authenticated:", user.id);
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in auth middleware:", error.message || error);
      responseHandler.error(res);
    }
  };



export default { auth, tokenDecode };
