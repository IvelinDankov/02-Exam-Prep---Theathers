import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    minLength: [3, "Min Length is 3 characters"],
    validate: [
      /^[A-Za-z0-9]+$/,
      "Username should contain only english letters and digits. No white spaces are allowed!",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [3, "Password must be at least 3 charachers."],
    validate: [
      /^[A-Za-z0-9]+$/,
      "Password should contain only english letters and digits. No white spaces are allowed!",
    ],
  },
  likedPlays: [
    {
      type: Types.ObjectId,
      ref: "Play",
    },
  ],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User = model("User", userSchema);

export default User;
