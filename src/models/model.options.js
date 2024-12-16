//---File  6 Back
// Execution Order:
// This file does not execute independently.
// It is used as an imported configuration object in Mongoose model definitions.

// Summary:
// Purpose: Provides consistent behavior for Mongoose models, including virtual fields, clean serialization, and automatic timestamps.
// Execution Order in Project: Utilized during Mongoose schema creation.
// Dependencies: None directly, but it is dependent on Mongoose schemas for practical usage.

const modelOptions = {
    toJSON: {
      virtuals: true,
      transform: (_, obj) => {
        delete obj._id;
        return obj;
      }
    },
    toObject: {
      virtuals: true,
      transform: (_, obj) => {
        delete obj._id;
        return obj;
      }
    },
    versionKey: false,
    timestamps: true
  };

  export default modelOptions;
