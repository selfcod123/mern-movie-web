//---File  3 Back
// This file defines a wrapper around the axios library, simplifying HTTP GET requests. It is likely used for making API calls to external services like The Movie Database (TMDb).
// Summary:
// Purpose: Provides a reusable, simplified utility for making GET requests with axios.
// Execution Order in Project: Only runs when called by other modules.
// Dependencies: Relies on axios and is indirectly dependent on the .env file if used with dynamic URLs or API keys.
import axios from "axios";

const get = async (url) => {
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "identity"
    }
  });
  return response.data;
};

export default { get };
