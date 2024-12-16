//---File  5 Back
// Execution Order:
// This file does not execute independently.
// Its functions are called by other modules (e.g., route handlers) whenever specific TMDb API data is needed.

// Summary:
// Purpose: Provides a centralized API layer for interacting with TMDb, encapsulating logic for specific endpoints.
// Execution Order in Project: Invoked as needed by other backend components like route handlers.
// Dependencies: Relies on axios.client.js, tmdb.endpoints.js, and the .env file for configuration.

import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

const tmdbApi = {
  mediaList: async ({ mediaType, mediaCategory, page }) => await axiosClient.get(
    tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
  ),
  mediaDetail: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaDetail({ mediaType, mediaId })
  ),
  mediaGenres: async ({ mediaType }) => await axiosClient.get(
    tmdbEndpoints.mediaGenres({ mediaType })
  ),
  mediaCredits: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaCredits({ mediaType, mediaId })
  ),
  mediaVideos: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaVideos({ mediaType, mediaId })
  ),
  mediaImages: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaImages({ mediaType, mediaId })
  ),
  mediaRecommend: async ({ mediaType, mediaId }) => await axiosClient.get(
    tmdbEndpoints.mediaRecommend({ mediaType, mediaId })
  ),
  mediaSearch: async ({ mediaType, query, page }) => await axiosClient.get(
    tmdbEndpoints.mediaSearch({ mediaType, query, page })
  ),
  personDetail: async ({ personId }) => await axiosClient.get(
    tmdbEndpoints.personDetail({ personId })
  ),
  personMedias: async ({ personId }) => await axiosClient.get(
    tmdbEndpoints.personMedias({ personId })
  )
};

export default tmdbApi;
