import mongoose from "mongoose";
const { Schema } = mongoose;

const storageSchema = new Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const storageCollection = "storage";

export const storageModel = mongoose.model(storageCollection, storageSchema);
