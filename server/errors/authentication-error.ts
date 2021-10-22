export default class AuthenticationError extends Error {
  constructor (public message: string = 'You are not authorized') {
    super(message)
  }
}
