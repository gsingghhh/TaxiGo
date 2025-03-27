import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24,
  },
});

const BLACKLISTTOKEN = mongoose.model("blacklisttoken", blacklistSchema);

export default BLACKLISTTOKEN;
