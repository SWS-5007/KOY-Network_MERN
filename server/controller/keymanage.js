require("dotenv").config();
const Key = require("../model/Key");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_Secret;

exports.getUserKeys = async (req, res, next) => {
  const userId = req.userInfo.id;
  Key.find({ userId: userId })
    .then((keys) => {
      res.status(200).json({ keys });
    })
    .catch((error) => {
      res.status(401).json({
        message: "There is no key for current User!",
        error: error.message,
      });
    });
};

exports.addNewKey = async (req, res, next) => {
  const reqUser = req.userInfo;
  const { data } = req.body;

  await Key.create({
    userId: reqUser.id,
    newPublicKey: data.newPublicKey,
    newPrivateKey: data.newPrivateKey,
    understandStatus: data.understandStatus,
    storageStatus: data.storageStatus,
  })
    .then((newKey) => {
      res.status(201).json({
        message: "New Key has been created successfully!",
        newKey: newKey,
      });
    })
    .catch((error) =>
      res.status(400).json({
        message: "New Key not successful created",
        error: error.message,
      })
    );
};

exports.deleteKey = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.remove())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
