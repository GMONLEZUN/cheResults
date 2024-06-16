import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    elo_rating: {
      type: Number,
      default: 0,
    },
    nat_rating: {
      type: Number,
      default: 0,
    },
    federation: {
      type: String,
    },
    fide_code: {
      type: String,
      default: 0,
    },
    national_code: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const playersCollection = "players";

export const PlayersModel = mongoose.model(playersCollection, playerSchema);
