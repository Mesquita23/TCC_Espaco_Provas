const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "2d720bf175cfde",
      pass: "e99590730c0c5f"
    }
  })