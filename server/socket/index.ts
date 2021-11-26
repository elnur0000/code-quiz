// @ts-nocheck
import { CandidateModel } from '../schemas/candidate'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { AuthenticationError } from '../errors'
import * as config from '../config'
import crypto from 'crypto'
import { Server, Socket } from 'socket.io'
import {
  BLUR,
  EXAM_END,
  EXAM_START,
  FOCUS
} from './events'

export default (io: Server): void => {
  io.use(function (socket: Socket, next) {
    if (socket.handshake.query && (socket.handshake.query.token || socket.handshake.query.accessToken)) {
      if (socket.handshake.query.accessToken) {
        socket.accessToken = socket.handshake.query.accessToken
      }
      if (socket.handshake.query.token !== 'null') {
        jwt.verify(socket.handshake.query.token, config.authSecret, function (err: VerifyErrors | null, decoded) {
          if (err) return next(new AuthenticationError())
          socket.userId = decoded.id
        })
      }
      next()
    } else {
      next(new AuthenticationError())
    }
  })
    .on('connection', function (socket: Socket) {
      // Connection now authenticated to receive further events
      if (socket.accessToken) socket.join(socket.accessToken)
      if (socket.userId) socket.join(socket.userId)

      socket.on(BLUR, async (msg: string): unknown => {
        const candidateName = await addReportToCandidateByAccessToken(msg, socket.accessToken)
        const test = await getCandidateAssignedTest(socket.accessToken)
        io.to(test.createdBy.toString()).emit(BLUR, { testId: test._id, msg: `${candidateName} ${msg}` })
      })
      // eslint-disable-next-line
      socket.on(FOCUS, async (msg) => {
        const candidateName = await addReportToCandidateByAccessToken(msg, socket.accessToken)
        const test = await getCandidateAssignedTest(socket.accessToken)
        io.to(test.createdBy.toString()).emit(FOCUS, { testId: test._id, msg: `${candidateName} ${msg}` })
      })
      // eslint-disable-next-line
      socket.on(EXAM_START, async (msg) => {
        await addReportToCandidateByAccessToken(msg, socket.roomId)
      })
      // eslint-disable-next-line
      socket.on(EXAM_END, async (msg) => {
        await addReportToCandidateByAccessToken(msg, socket.roomId)
      })
    })
}

async function addReportToCandidateByAccessToken (msg: string, accessToken: string): Promise<string> {
  const candidate = await CandidateModel.findOne({
    accessToken: crypto
      .createHash('sha256')
      .update(accessToken)
      .digest('hex')

  })
  candidate.reports.push(msg)
  await candidate.save()
  return candidate.name
}
async function getCandidateAssignedTest (accessToken: string): Promise<any> {
  const candidate = await CandidateModel.findOne({
    accessToken: crypto
      .createHash('sha256')
      .update(accessToken)
      .digest('hex')

  }).populate('assignedTest')
  return candidate.assignedTest
}
