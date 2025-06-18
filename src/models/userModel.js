import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
    minLength: [2, "Min Length is 2 characters"],
    maxlength: [20, "Max allowed character are 20"],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minLength: [4, "Password must be at least 4 charachers."],
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
