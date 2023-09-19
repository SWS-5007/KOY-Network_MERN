const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Add this line to import Schema

const keySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: false,
  },
  newPublicKey: { type: String, required: true },
  newPrivateKey: { type: String, required: true },
  understandStatus: { type: Boolean, required: true, default: true },
  storageStatus: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("key", keySchema);
