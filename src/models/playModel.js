import { Schema, model, Types } from "mongoose";

const playSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxLength: 50,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
});

const Play = model("Play", playSchema);

export default Play;
