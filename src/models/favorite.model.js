//---File  8 Back
// Execution Order:
// This file is executed when the Favorite model is imported and used in the application.
// The schema is applied when performing database operations (e.g., adding or querying favorite items).

// Summary:
// Purpose: Defines the structure and behavior of the Favorite collection, ensuring consistent storage of users' favorite media items.
// Execution Order in Project: Executes when the Favorite model is imported and used by other files (e.g., in routes or services).
// Dependencies: Relies on mongoose for schema and model creation, and model.options.js for shared configuration.

import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Favorite",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mediaType: {
      type: String,
      enum: ["tv", "movie"],
      required: true
    },
    mediaId: {
      type: String,
      required: true
    },
    mediaTitle: {
      type: String,
      required: true
    },
    mediaPoster: {
      type: String,
      required: true
    },
    mediaRate: {
      type: Number,
      required: true
    },
  }, modelOptions)
);
