const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Add this line to import Schema

const tokenSchema = new Schema({
  // Use Schema instead of mongoose.Schema
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: true,
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  // createdAt: { type: Date, default: Date.now(), expires: 3600 },
});

module.exports = mongoose.model("token", tokenSchema);
