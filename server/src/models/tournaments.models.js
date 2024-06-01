import mongoose from "mongoose";
const { Schema } = mongoose;

const tournamentSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    owner: {
      type: String,
    },
    club: {
      type: String,
    },
    federation: {
      type: String,
    },
    rounds: {
      type: Number,
    },
    styleTournament: {
      type: ["round-robin", "swiss", "elimination"],
    },
    teamsTournament: {
      type: Boolean,
    },
    teams: {
      name: {
        type: String,
      },
      players: {
        type: [
          {
            player: {
              type: mongoose.Types.ObjectId,
              ref: "players",
            },
          },
        ],
        default: [],
      },
    },
    styleGame: {
      type: String,
    },
    location: {
      country: {
        type: String,
      },
      province: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    currRound: {
      type: Number,
      default: 0,
    },
    status: {
      type: ["active", "ended", "cancelled"],
      default: "active",
    },
    players: {
      type: [
        {
          player: {
            type: mongoose.Types.ObjectId,
            ref: "players",
          },
        },
      ],
      default: [],
    },
    arbiter: {
      type: String,
    },
    dateRounds: {
      type: [
        {
          roundNo: {
            type: Number,
          },
          date: {
            type: String,
          },
          hour: {
            type: String,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const tournamentsCollection = "tournaments";

export const TournamentsModel = mongoose.model(tournamentsCollection, tournamentSchema);
