import * as config from '../config'
import nodemailer, { SendMailOptions } from 'nodemailer'

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD
//   }
// })

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD
  }
})

export const sendEmail = async (options: Omit<SendMailOptions, 'from'>): Promise<void> => {
  const message = {
    ...options,
    from: `${config.emailName} <${config.fromEmail}>`
  }

  const info = await transporter.sendMail(message)

  console.log('Message sent: %s', info.messageId)
}
