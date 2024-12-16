//---File  7 Back
// Execution Order:
// This file is executed when the Review model is imported and used in the application.
// The schema is applied during database operations (e.g., creating or querying reviews).

// Summary:
// Purpose: Defines the structure and behavior of the Review collection, ensuring consistency in how review data is stored and accessed.
// Execution Order in Project: Executed when the Review model is imported and used by other files (e.g., in routes or services).
// Dependencies: Relies on mongoose for schema and model definition, and model.options.js for behavior configuration
import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Review",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
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
  }, modelOptions)
);
