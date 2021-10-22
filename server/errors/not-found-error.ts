export default class NotFoundError extends Error {
  constructor (public message: string = 'Resource not found') {
    super(message)
  }
}
