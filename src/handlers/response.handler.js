//---File  11 Back
// Execution Order:
// Triggered in Route Handlers or Middleware:
// These functions are called when processing a request, after determining the appropriate response (e.g., success, error, or unauthorized).
// Example Execution Flow:
// A client makes a request to a route.
// The route handler processes the request.
// Based on the outcome, a specific function from response.handler.js is called to send a response.
// Return Response to Client:
// Once a response function (e.g., ok, badrequest) is called, the response is sent, and no further middleware or logic in the route handler is executed.

// Summary:
// Purpose: Provides reusable response functions to standardize how the API sends HTTP responses.
// Execution Order in Project: Invoked in route handlers or middleware after processing a request to send the final response.
// Dependencies: Works alongside the Express.js response object and integrates with validation and route logic.

const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

//********* ERROR **************
const error = (res, errorDetails = null) => {
    console.error("Internal Server Error:", errorDetails || "Unknown Error");
    responseWithData(res, 500, {
      status: 500,
      message: "Oops! Something worng!",
      details: errorDetails ? errorDetails.message || errorDetails : null
    });
  };


// const error = (res) => responseWithData(res, 500, {
//   status: 500,
//   message: "Oops! Something worng!"
// });

const badrequest = (res, message) => responseWithData(res, 400, {
  status: 400,
  message
});

const ok = (res, data) => responseWithData(res, 200, data);

const created = (res, data) => responseWithData(res, 201, data);

const unauthorize = (res) => responseWithData(res, 401, {
  status: 401,
  message: "Unathorized"
});

const notfound = (res) => responseWithData(res, 404, {
  status: 404,
  message: "Resource not found"
});

export default {
  error,
  badrequest,
  ok,
  created,
  unauthorize,
  notfound
};
