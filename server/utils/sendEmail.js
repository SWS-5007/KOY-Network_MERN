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

module.exports = async (email, subject, username, confirmUrl) => {
  try {
    const port = Number(process.env.EMAIL_PORT);

    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: port,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailContent = await readHTMLFile("./utils/email_template.html"); // Replace with the actual path to your HTML file

    // Replace the username in email_template
    const updatedUserNameHtml = emailContent.replace("UserName", `${username}`);

    // Replace the confirm url in email_template
    const customizedEmailHtml = updatedUserNameHtml.replace(
      "confirm_url",
      `${confirmUrl}`
    );

    await transporter.sendMail({
      from: "Koy-network-website",
      to: email,
      subject: subject,
      html: customizedEmailHtml,
    });

    return true;
  } catch (error) {
    console.error("Sending Email Error:_22222222222222 " + error);
    return false;
  }
};