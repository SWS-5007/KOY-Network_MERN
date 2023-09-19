require("dotenv").config();
const User = require("../model/User");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.Vonage_apiKey,
  apiSecret: process.env.Vonage_apiSecret,
});

exports.smsverify = async (req, res, next) => {
  const customExpiry = 5; // Change this value to your desired expiration time

  nexmo.verify.request(
    {
      number: req.body.number,
      brand: "KOY Network Verify", // Replace with your brand name
      code_length: 6, // Specify the code length you want
      // pin_expiry: customExpiry, // Set the custom expiration time
    },
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send SMS" });
      } else {
        console.log(result);
        res.status(200).json({
          message: "SMS sent correctly!",
          result: result,
        });
      }
    }
  );
};

exports.smscheck = async (req, res, next) => {
  nexmo.verify.check(
    {
      request_id: req.body.requestId,
      code: req.body.code,
    },
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to check SMS" });
      } else {
        if (result.status === "0") {
          res.status(200).json({
            message: "SMS verified successfully!",
          });
        } else {
          res.status(404).json({
            message: "SMS is not Correct!",
          });
        }
      }

      console.log("smscheck", result);
    }
  );
};
