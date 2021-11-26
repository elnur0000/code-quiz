export default class BadRequestError extends Error {
  constructor (public message: string = 'Bad request') {
    super(message)
  }
}
