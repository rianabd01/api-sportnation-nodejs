// utils/mailSender.js
const nodemailer = require('nodemailer');
const generateOtpEmail = require('../../src/otpBodyEmail');
const { emailService, emailPassword } = require('../config/app.conf');

const emailSender = async ({ email, title, fullName, otp }) => {
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailService,
        pass: emailPassword,
      },
    });
    // Send emails to users
    let info = await transporter.sendMail({
      from: 'SportNation',
      to: email,
      subject: title,
      html: generateOtpEmail(fullName, otp),
    });
    return info;
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = emailSender;
