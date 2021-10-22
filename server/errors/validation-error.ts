export default class ValidationError extends Error {
  constructor (public message: string = 'Bad request') {
    super(message)
  }
}
