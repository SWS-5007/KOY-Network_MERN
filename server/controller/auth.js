require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../model/Token");
const sendEmail = require("../utils/sendEmail");
const resetPwdSend = require("../utils/resetPwdSend");
const generateRandomString = require("../utils/generateRandomString");

const jwtSecret = process.env.JWT_Secret;

exports.register = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    country,
    id_type,
    national_id,
    referral_code,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then(async (hash) => {
    const newRandomAccountName = generateRandomString(5);

    await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      country: country,
      id_type: id_type,
      national_id: national_id,
      referral_code: referral_code,
      account_name: newRandomAccountName,
      password: hash,
    })
      .then(async (user) => {
        const maxAge = 3 * 60 * 60; // 3hrs

        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          jwtSecret,
          {
            expiresIn: maxAge, // 3hrs
          }
        );

        res.cookie("login_jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });

        //Email Verification
        await new Token({
          userId: user._id,
          token: token,
        }).save();

        const confirmUrl = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
        const sendEmailStatus = await sendEmail(
          user.email,
          "Welcome to KOY - Confirm Your Email Address!",
          user.firstname,
          confirmUrl
        );

        if (sendEmailStatus === true) {
          res.status(201).json({
            message:
              "An Email sent to your account. Please verify your email address!",
            user: user._id,
            email: user.email,
          });
        } else {
          await User.deleteOne({ _id: user._id })
            .then((result) => {
              res.status(500).json({
                message: "Verify Email Sent Error!",
              });
            })
            .catch((error) => {
              console.log("Delete createdUser Error!", error);
              res.status(500).json({
                message: error.message,
              });
            });
        }
      })
      .catch((error) =>
        res.status(400).json({
          message: "User not successful created",
          error: error.message,
        })
      );
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log("@@@Login@@@", req.body);
  // Check if email and password is provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email or Password not present",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          if (!user.verified) {
            const maxAge = 3 * 60 * 60; // 3hrs

            const token = jwt.sign(
              {
                id: user._id,
                email: user.email,
              },
              jwtSecret,
              {
                expiresIn: maxAge, // 3hrs
              }
            );

            res.cookie("login_jwt", token, {
              httpOnly: true,
              maxAge: maxAge * 1000,
            });

            const confirmUrl = `${process.env.BASE_URL}users/${user._id}/verify/${token}`;
            sendEmail(
              user.email,
              "Welcome to KOY - Confirm Your Email Address!",
              user.firstname,
              confirmUrl
            );

            return res.status(400).send({
              message:
                "An Email sent to your account. Please verify your email address!",
            });
          } else {
            let login_jwt_token = "";

            Token.findOne({ userId: user._id }).then(async (current_token) => {
              if (!current_token) {
                const maxAge = 3 * 60 * 60;

                const new_token = jwt.sign(
                  {
                    id: user._id,
                    email: user.email,
                  },
                  jwtSecret,
                  {
                    expiresIn: maxAge, // 3hrs
                  }
                );

                res.cookie("login_jwt", new_token, {
                  httpOnly: true,
                  maxAge: maxAge * 1000, // 3hrs in ms
                });
                //Email Verification
                await new Token({
                  userId: user._id,
                  token: new_token,
                })
                  .save()
                  .then((new_created_token) => {
                    login_jwt_token = new_created_token.token;
                    console.log("@@@@new_created_token@@@@", new_created_token);

                    res.status(201).json({
                      message: "User successfully Logged in",
                      userData: user,
                      login_jwt_token: login_jwt_token,
                    });
                  })
                  .catch((error) => {
                    res
                      .status(400)
                      .json({ message: "Create New Token Error when Login" });
                  });
              } else {
                login_jwt_token = current_token.token;
                res.status(201).json({
                  message: "User successfully Logged in",
                  userData: user,
                  login_jwt_token: login_jwt_token,
                });
              }
            });
          }
        } else {
          res.status(400).json({ message: "Invalid Email or Password" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.updateUserData = async (req, res, next) => {
  const reqUser = req.userInfo;
  const { newUserData } = req.body;

  await User.findById(reqUser.id)
    .then((user) => {
      user.firstname = newUserData.firstname;
      user.lastname = newUserData.lastname;
      user.email = newUserData.email;
      user.country = newUserData.country;
      user.id_type = newUserData.id_type;
      user.national_id = newUserData.national_id;
      user.save((err) => {
        if (err) {
          return res
            .status("400")
            .json({ message: "An error occurred", error: err.message });
          process.exit(1);
        }
        res
          .status("200")
          .json({ message: "User Profile Updated Successfully!", user });
      });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    });
};

exports.deleteUser = async (req, res, next) => {
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

exports.getUserData = async (req, res, next) => {
  const userId = req.userInfo.id;
  User.findOne({ _id: userId })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res
        .status(401)
        .json({ message: "There is no User!", error: error.message });
    });
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "No Existing User!" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });

    if (!token) return res.status(400).send({ message: "No Correct Token!" });

    await User.updateOne({ _id: user._id, verified: true });
    res.status(200).send({ message: "Email Verified!" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.resetPwdRequest = async (req, res, next) => {
  try {
    const { resetEmail } = req.body;

    const user = await User.findOne({ email: resetEmail });

    if (!user) {
      res.status(400).json({
        message: "No User who has this email",
        error: "Email Owner not found",
      });
    } else {
      const resetPwdUrl = `${process.env.BASE_URL}users/${user._id}/resetpwd`;

      resetPwdSend(
        resetEmail,
        "KOY Password Reset Request",
        user.firstname,
        resetPwdUrl
      );

      res.status(200).json({
        message: "Reset Password Request has been sent successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Reset Password Request Error",
      error: error.message,
    });
  }
};

exports.updateUserPwd = async (req, res, next) => {
  const { newPwd, userId } = req.body;

  await User.findById(userId)
    .then((user) => {
      bcrypt.hash(newPwd, 10).then(async (hashedNewPwd) => {
        user.password = hashedNewPwd;
        user.save((err) => {
          //Monogodb error checker
          if (err) {
            return res.status("400").json({
              message: "An error occurred on Update New Pwd",
              error: err.message,
            });
            process.exit(1);
          }
          const maxAge = 3 * 60 * 60;

          const new_token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs
            }
          );

          res.cookie("login_jwt", new_token, {
            httpOnly: true,
            maxAge: maxAge * 1000, // 3hrs in ms
          });

          Token.findOne({ userId: user._id })
            .then((current_token) => {
              if (current_token) {
                current_token.token = new_token;
                current_token.save((err) => {
                  if (err) {
                    return res.status("400").json({
                      message: "An error occurred on Update New Token",
                      error: err.message,
                    });
                  }
                });
              } else {
                new Token({
                  userId: user._id,
                  token: new_token,
                }).save();
              }
              res
                .status("200")
                .json({ message: "Update Pwd Successful", user });
            })
            .catch((err) => {
              console.log("Error", err);
              return res.status(404).send({
                message: "New Token Error when update password!",
              });
            });
        });
      });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message });
    });
};
