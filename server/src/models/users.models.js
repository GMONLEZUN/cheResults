import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = Schema(
  {
    name: String,
    age: Number,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ["arbiter", "user", "admin", "moderator"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
    avatar: {
      type: mongoose.Types.ObjectId,
    },
    validated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const usersCollection = "users";

export const usersModel = mongoose.model(usersCollection, userSchema);
