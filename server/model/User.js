const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    unique: false,
    required: true,
  },

  lastname: {
    type: String,
    unique: false,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  country: {
    type: String,
    unique: false,
    required: true,
  },

  id_type: {
    type: String,
    unique: false,
    required: true,
  },

  national_id: {
    type: Number,
    unique: false,
    required: true,
  },

  account_name: {
    type: String,
    unique: true,
    required: false,
  },

  referral_code: {
    type: String,
    unique: false,
    required: false,
  },

  password: {
    type: String,
    minlength: 6,
    required: true,
  },

  verified: {
    type: Boolean,
    default: false,
    required: true,
  },

  sms_verified: {
    type: Boolean,
    default: false,
    required: true,
  },

  passkey_verified: {
    type: Boolean,
    default: false,
    required: true,
  },

  createdAt: { type: Date, default: Date.now() },

  updatedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("user", UserSchema);
