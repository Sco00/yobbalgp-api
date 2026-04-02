import { type Response } from 'express'
import { HttpStatusCode } from '../../../shared/errors/StatusCode.js'

export class ResponseFormatter {
  static success<T>(
    res:        Response,
    data:       T,
    message:    string,
    statusCode: number = HttpStatusCode.OK,
  ): void {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    })
  }
}
