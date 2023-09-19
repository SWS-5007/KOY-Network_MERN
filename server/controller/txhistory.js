require("dotenv").config();
const TxHistory = require("../model/TxHistory");
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_Secret;

exports.getUserTxHistory = async (req, res, next) => {
  const userId = req.userInfo.id;
  TxHistory.find({ userId: userId })
    .then((transactions) => {
      res.status(200).json({ transactions });
    })
    .catch((error) => {
      res.status(401).json({
        message: "There is no Transaction History for current User!",
        error: error.message,
      });
    });
};

exports.newTransaction = async (req, res, next) => {
  const reqUser = req.userInfo;
  const { data } = req.body;

  await TxHistory.create({
    userId: reqUser.id,
    status: data.status,
    usdt_amount: data.usdt_amount,
    koyn_amount: data.koyn_amount,
    tx_number: data.tx_number,
  })
    .then((newTransaction) => {
      res.status(201).json({
        message: "New Transaction has been added successfully!",
        newTransaction: newTransaction,
      });
    })
    .catch((error) =>
      res.status(400).json({
        message: "New Transaction not successful added",
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
