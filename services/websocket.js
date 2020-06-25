const jwt = require('jsonwebtoken')
const AuthenticationError = require('../errors/authentication-error')
const config = require('../config')
const { Candidate } = require('../models/candidate')
const crypto = require('crypto')

module.exports = (io) => {
  io.use(function (socket, next) {
    if (socket.handshake.query && (socket.handshake.query.token || socket.handshake.query.accessToken)) {
      if (socket.handshake.query.accessToken) {
        socket.accessToken = socket.handshake.query.accessToken
      }
      if (socket.handshake.query.token !== 'null') {
        jwt.verify(socket.handshake.query.token, config.authSecret, function (err, decoded) {
          if (err) return next(new AuthenticationError())
          socket.userId = decoded.id
        })
      }
      next()
    } else {
      next(new AuthenticationError())
    }
  })
    .on('connection', function (socket) {
      console.log('connection')
      // Connection now authenticated to receive further events
      if (socket.accessToken) socket.join(socket.accessToken)
      if (socket.userId) socket.join(socket.userId)

      socket.on('event://blur', async (msg) => {
        const candidateName = await addReportToCandidateByAccessToken(msg, socket.accessToken)
        const test = await getCandidateAssignedTest(socket.accessToken)
        io.to(test.createdBy.toString()).emit('event://blur', { testId: test._id, msg: `${candidateName} ${msg}` })
      })
      socket.on('event://focus', async (msg) => {
        const candidateName = await addReportToCandidateByAccessToken(msg, socket.accessToken)
        const test = await getCandidateAssignedTest(socket.accessToken)
        io.to(test.createdBy.toString()).emit('event://focus', { testId: test._id, msg: `${candidateName} ${msg}` })
      })
      socket.on('event://examStart', async (msg) => {
        await addReportToCandidateByAccessToken(msg, socket.roomId)
      })
      socket.on('event://examEnd', async (msg) => {
        await addReportToCandidateByAccessToken(msg, socket.roomId)
      })
    })
}

async function addReportToCandidateByAccessToken (msg, accessToken) {
  const candidate = await Candidate.findOne({
    accessToken: crypto
      .createHash('sha256')
      .update(accessToken)
      .digest('hex')

  })
  candidate.reports.push(msg)
  await candidate.save()
  return candidate.name
}
async function getCandidateAssignedTest (accessToken) {
  const candidate = await Candidate.findOne({
    accessToken: crypto
      .createHash('sha256')
      .update(accessToken)
      .digest('hex')

  }).populate('assignedTest')
  return candidate.assignedTest
}
