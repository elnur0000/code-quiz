import {
  RequestUser
} from './index'

declare global {
  namespace Express {
    interface Request {
      user: RequestUser
    }
  }
  namespace SocketIO {
    interface Socket {
      accessToken?: string
      userId?: string
      roomId?: string
    }
  }
}
