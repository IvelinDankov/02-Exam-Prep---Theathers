import { Schema, model, Types } from "mongoose";

const playSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required!"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Description is required!"],
    maxLength: 500,
  },
  imageUrl: {
    type: String,
    required: [true, "ImageUrl is required!"],
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Play = model("Play", playSchema);

export default Play;
