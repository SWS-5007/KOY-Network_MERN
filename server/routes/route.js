const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUserData,
  updateUserData,
  verifyEmail,
  resetPwdRequest,
  updateUserPwd,
} = require("../controller/auth");

const { getUserKeys, addNewKey } = require("../controller/keymanage");
const { getUserTxHistory, newTransaction } = require("../controller/txhistory");

const { smsverify, smscheck } = require("../controller/twofa");

const { userAuth } = require("../middleware/auth");

const accList = require("../controller/NewKoynAccount");
const reqList = require("../controller/KoynAccess");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/resetpwdrequest").post(resetPwdRequest);
router.route("/updatepwd").post(updateUserPwd);
router.route("/getUserData").get(userAuth, getUserData);
router.route("/updateUserData").post(userAuth, updateUserData);

// User Key Apis
router.route("/getUserKeys").get(userAuth, getUserKeys);
router.route("/newKeys").post(userAuth, addNewKey);

// Transaction History Apis
router.route("/getUserTxHistory").get(userAuth, getUserTxHistory);
router.route("/newTransaction").post(userAuth, newTransaction);

// 2FA Apis
router.route("/smsverify").post(smsverify);
router.route("/smscheck").post(smscheck);

// KOYN Account Apis
router
  .route("/koynAccount")
  .get(accList.list_accounts)
  .post(accList.create_account);

router.route("/:id/verify/:token").get(verifyEmail);

// router.route("/update").put(adminAuth, update);
// router.route("/deleteUser").delete(adminAuth, deleteUser);

module.exports = router;
