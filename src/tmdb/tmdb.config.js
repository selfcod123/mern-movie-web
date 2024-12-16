//---File  4 Back
// This file provides a utility for generating full API request URLs for The Movie Database (TMDb).
// It simplifies API calls by dynamically constructing URLs with the necessary parameters.

// Execution Order:
// This file does not execute independently.
// It is called by other modules to generate URLs during TMDb API requests.

// Summary:
// Purpose: Provides a utility to construct complete TMDb API request URLs.
// Execution Order in Project: Only runs when called by other modules, typically before making API requests.
// Dependencies: Relies on .env for TMDB_BASE_URL and TMDB_KEY.

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

export default { getUrl };
