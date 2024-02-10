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

transporter.verify().then(console.log).catch(console.error);

let mailDetails = {
  from: `Registration V1 <${process.env.EMAIL_ID}>`,
  to: 'abbas1920@gmail.com',
  subject: 'Test mail',
  text: 'Node.js testing mail for GeeksforGeeks'
};

transporter
  .sendMail(mailDetails,
      function (err, data) {
          if (err) {
              console.log('Error Occurs');
          } else {
              console.log('Email sent successfully');
          }
      });