"use strict";
// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unimplemented = exports.unavailable = exports.unauthorized = exports.tooManyRequests = exports.paymentRequired = exports.notFound = exports.notAllowed = exports.internalServerError = exports.forbidden = exports.error = exports.badRequest = void 0;
/** 400 Bad Request error handler. */
var badRequest = function (res, next, data) {
    return (0, exports.error)(res, next, 400, __assign({ message: 'bad request' }, data));
};
exports.badRequest = badRequest;
/** General error handler. */
var error = function (res, next, code, data) {
    res.status(code).json(data);
    next();
};
exports.error = error;
/** 403 Forbidden error handler. */
var forbidden = function (res, next, data) {
    return (0, exports.error)(res, next, 403, __assign({ message: 'forbidden' }, data));
};
exports.forbidden = forbidden;
/** 500 Internal Server Error handler. */
var internalServerError = function (res, next, data) {
    return (0, exports.error)(res, next, 500, __assign({ message: 'internal server error' }, data));
};
exports.internalServerError = internalServerError;
/** 405 Method Not Allowed error handler. */
var notAllowed = function (res, next, data) {
    return (0, exports.error)(res, next, 405, __assign({ message: 'method not allowed' }, data));
};
exports.notAllowed = notAllowed;
/** 404 Not Found error handler. */
var notFound = function (res, next, data) {
    return (0, exports.error)(res, next, 404, __assign({ message: 'not found' }, data));
};
exports.notFound = notFound;
/** 402 Payment Required error handler. */
var paymentRequired = function (res, next, data) {
    return (0, exports.error)(res, next, 402, __assign({ message: 'payment required' }, data));
};
exports.paymentRequired = paymentRequired;
/** 429 Too Many Requests handler. */
var tooManyRequests = function (res, next, data) {
    return (0, exports.error)(res, next, 429, __assign({ message: 'too many requests' }, data));
};
exports.tooManyRequests = tooManyRequests;
/** 401 Unauthorized error handler. */
var unauthorized = function (res, next, data) {
    return (0, exports.error)(res, next, 401, __assign({ message: 'unauthorized' }, data));
};
exports.unauthorized = unauthorized;
/** 503 Service Unavailable error handler. */
var unavailable = function (res, next, data) {
    return (0, exports.error)(res, next, 503, __assign({ message: 'service unavailable' }, data));
};
exports.unavailable = unavailable;
/** 501 Unimplemented error handler. */
var unimplemented = function (res, next, data) {
    return (0, exports.error)(res, next, 501, __assign({ message: 'unimplemented' }, data));
};
exports.unimplemented = unimplemented;
