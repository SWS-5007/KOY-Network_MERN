"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KoynAccountsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
    unique: false,
  },
  full_name: {
    type: String,
    required: "User full name",
  },
  cell_phone: {
    type: String,
    default: "User cell phone",
  },
  chain_name: {
    type: String,
    required: "User chain 12 chars name",
  },
  public_key: {
    type: String,
    required: "Chain account public key",
  },
  transaction: {
    type: String,
    default: "Create account transaction id",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: [
      {
        type: String,
        enum: ["manager", "user", "none"],
      },
    ],
    default: ["none"],
  },
});

module.exports = mongoose.model("KoynAccounts", KoynAccountsSchema);
