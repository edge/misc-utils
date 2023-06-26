import { NextFunction, Response } from 'express';
/**
 * Simplified handler for error responses.
 */
export type ErrorHandler = (res: Response, next: NextFunction, data?: Record<string, unknown>) => void;
/** 400 Bad Request error handler. */
export declare const badRequest: ErrorHandler;
/** General error handler. */
export declare const error: (res: Response, next: NextFunction, code: number, data: Record<string, unknown>) => void;
/** 403 Forbidden error handler. */
export declare const forbidden: ErrorHandler;
/** 500 Internal Server Error handler. */
export declare const internalServerError: ErrorHandler;
/** 405 Method Not Allowed error handler. */
export declare const notAllowed: ErrorHandler;
/** 404 Not Found error handler. */
export declare const notFound: ErrorHandler;
/** 402 Payment Required error handler. */
export declare const paymentRequired: ErrorHandler;
/** 429 Too Many Requests handler. */
export declare const tooManyRequests: ErrorHandler;
/** 401 Unauthorized error handler. */
export declare const unauthorized: ErrorHandler;
/** 503 Service Unavailable error handler. */
export declare const unavailable: ErrorHandler;
/** 501 Unimplemented error handler. */
export declare const unimplemented: ErrorHandler;
