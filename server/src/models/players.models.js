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
    nac_rating: {
      type: Number,
      default: 0,
    },
    federation: {
      type: String,
    },
    fide_code: {
      type: String,
      unique: true,
    },
    national_code: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

playerSchema.path("fide_code").unique({ unique: true, sparse: true });
playerSchema.path("national_code").unique({ unique: true, sparse: true });

const playersCollection = "players";

export const PlayersModel = mongoose.model(playersCollection, playerSchema);
