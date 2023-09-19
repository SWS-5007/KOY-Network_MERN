require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs-extra");

async function readHTMLFile(path) {
  try {
    const html = await fs.readFile(path, "utf-8");
    return html;
  } catch (err) {
    console.error("Error reading HTML file:", err);
    throw err;
  }
}

module.exports = async (email, subject, username, resetPwdUrl) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailContent = await readHTMLFile("./utils/resetpwd_template.html"); // Replace with the actual path to your HTML file

    // Replace the username in email_template
    const updatedUserNameHtml = emailContent.replace(
      "<!-- UserName -->",
      `${username}`
    );
    // Replace the confirm url in email_template
    const customizedEmailHtml = updatedUserNameHtml.replace(
      "reset_password_url",
      `${resetPwdUrl}`
    );

    await transporter.sendMail(
      {
        from: "Koy-network-website",
        to: email,
        subject: subject,
        html: customizedEmailHtml,
      },
      function (error, info) {
        if (error) {
          console.log("Error sending Reset Password Email:", error);
        } else {
          console.log("Reset Password Email sent:", info.response);
        }
      }
    );

    console.log("Reset Password Email sent successfully");
  } catch (error) {
    console.log("Reset Password Email not sent");
    console.log(error);
  }
};
