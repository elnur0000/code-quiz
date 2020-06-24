const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD
//   }
// })
const transporter = nodemailer.createTransport({
  service: 'FastMail',
  auth: {
    user: process.env.FASTMAIL_USER,
    pass: process.env.FASTMAIL_PASSWORD
  }
})

const sendEmail = async (to, subject, body, type) => {
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    [type]: body
  }

  const info = await transporter.sendMail(message)

  console.log('Message sent: %s', info.messageId)
}

module.exports = { sendEmail }
