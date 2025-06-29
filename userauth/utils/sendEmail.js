const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject,
    text,
  });
};
module.exports = sendEmail;
