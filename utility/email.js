require("dotenv").config();
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport(
  {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD
    }
  }
);

const sendMail = async(mailParams) => {
  try {
    const mailDetails = {
      from: `Registration V1 <${process.env.EMAIL_ID}>`,
      to: mailParams.to,
      subject: "Registration V1: Account Activation",
      html: `<h3>Welcome, ${mailParams.name}</h3><hr><p>Please click the link to activate your account</p>Activation Link: <a href="${process.env.ACTIVATION_URL}${mailParams.activationCode}">Activate</a>`
    }
    const info = await transporter.sendMail(mailDetails);
    return info;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };