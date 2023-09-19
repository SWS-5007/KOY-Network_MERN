"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KoynAccessRequestSchema = new Schema({
  user_name: {
    type: String,
    required: "User requesting access",
  },
  manager_name: {
    type: String,
    required: "Manager providing access",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("KoynAccessRequests", KoynAccessRequestSchema);
