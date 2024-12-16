//---File  10 Back
// Execution Order:
// Validation Middleware:

// Executes after validation rules have been applied to a request but before the main route handler logic.
// Checks for errors and stops further execution if the request is invalid.
// Main Route Handler:
// If validation passes, the request proceeds to the next middleware or route controller.

// Summary:
// Purpose: Handles validation errors, ensuring that only valid requests are processed further in the application.
// Execution Order in Project: Executes as middleware in routes after validation rules but before the route handler logic.
// Dependencies: Relies on express-validator for collecting and interpreting validation errors.
import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({
    message: errors.array()[0].msg
  });

  next();
};

export default { validate };
