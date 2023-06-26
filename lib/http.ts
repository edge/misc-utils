// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { NextFunction, Response } from 'express'

/**
 * Simplified handler for error responses.
 */
export type ErrorHandler = (res: Response, next: NextFunction, data?: Record<string, unknown>) => void

/** 400 Bad Request error handler. */
export const badRequest: ErrorHandler = (res, next, data) =>
  error(res, next, 400, { message: 'bad request', ...data })

/** General error handler. */
export const error = (res: Response, next: NextFunction, code: number, data: Record<string, unknown>) => {
  res.status(code).json(data)
  next()
}

/** 403 Forbidden error handler. */
export const forbidden: ErrorHandler = (res, next, data) =>
  error(res, next, 403, { message: 'forbidden', ...data })

/** 500 Internal Server Error handler. */
export const internalServerError: ErrorHandler = (res, next, data) =>
  error(res, next, 500, { message: 'internal server error', ...data })

/** 405 Method Not Allowed error handler. */
export const notAllowed: ErrorHandler = (res, next, data) =>
  error(res, next, 405, { message: 'method not allowed', ...data })

/** 404 Not Found error handler. */
export const notFound: ErrorHandler = (res, next, data) =>
  error(res, next, 404, { message: 'not found', ...data })

/** 402 Payment Required error handler. */
export const paymentRequired: ErrorHandler = (res, next, data) =>
  error(res, next, 402, { message: 'payment required', ...data })

/** 429 Too Many Requests handler. */
export const tooManyRequests: ErrorHandler = (res, next, data) =>
  error(res, next, 429, { message: 'too many requests', ...data })

/** 401 Unauthorized error handler. */
export const unauthorized: ErrorHandler = (res, next, data) =>
  error(res, next, 401, { message: 'unauthorized', ...data })

/** 503 Service Unavailable error handler. */
export const unavailable: ErrorHandler = (res, next, data) =>
  error(res, next, 503, { message: 'service unavailable', ...data })

/** 501 Unimplemented error handler. */
export const unimplemented: ErrorHandler = (res, next, data) =>
  error(res, next, 501, { message: 'unimplemented', ...data })
