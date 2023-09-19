const mongoose = require("mongoose");
const Schema = mongoose.Schema; // Add this line to import Schema

const txHistorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: false,
  },
  status: { type: String, required: true },
  usdt_amount: { type: String, required: true },
  koyn_amount: { type: String, required: true },
  tx_number: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("tx_history", txHistorySchema);
