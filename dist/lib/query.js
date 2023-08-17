"use strict";
// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.str = exports.sorts = exports.integer = exports.bool = exports.array = exports.TRUE = exports.FALSE = void 0;
/** Boolean false value matches in query string. */
exports.FALSE = ['0', 'no', 'off', 'false'];
/** Valid sort expression. */
var SORT_REGEXP = /^-?[a-zA-Z0-9._]+$/;
/** Boolean true value matches in query string. */
exports.TRUE = ['1', 'on', 'yes', 'true'];
/** Read query value as a string array. */
var array = function (input, def) {
    if (input instanceof Array)
        return input;
    if (typeof input === 'string')
        return [input];
    return def || [];
};
exports.array = array;
/** Read query value as a Boolean. */
var bool = function (input, def) {
    if (typeof input !== 'string')
        return def;
    if (exports.TRUE.includes(input))
        return true;
    if (exports.FALSE.includes(input))
        return false;
    return def;
};
exports.bool = bool;
/**
 * Read query value as an integer number.
 * The value can optionally be bounded by `min` and `max` arguments.
 */
var integer = function (input, min, max) {
    if (input instanceof Array)
        return (0, exports.integer)(input[0], min, max);
    if (typeof input !== 'string')
        return;
    var n = parseInt(input);
    if (isNaN(n))
        return;
    if (min !== undefined)
        n = Math.max(n, min);
    if (max !== undefined)
        n = Math.min(n, max);
    return n;
};
exports.integer = integer;
/**
 * Read query value as a set of sort orders.
 * If a sort property is prefixed with a hyphen `-` the sort will be descending, otherwise ascending.
 */
var sorts = function (input, allow, def) {
    if (input instanceof Array) {
        return input
            .filter(function (v) { return SORT_REGEXP.test(v); })
            .map(function (v) { return v[0] === '-' ? [v.slice(1), 'DESC'] : [v, 'ASC']; })
            .filter(function (_a) {
            var prop = _a[0];
            return allow.includes(prop);
        });
    }
    else if (typeof input === 'string') {
        var _a = input[0] === '-' ? [input.slice(1), 'DESC'] : [input, 'ASC'], prop = _a[0], dir = _a[1];
        if (allow.includes(prop))
            return [[prop, dir]];
        return [];
    }
    if (def instanceof Array) {
        if (def[0] instanceof Array)
            return def;
        else
            return [def];
    }
    return [];
};
exports.sorts = sorts;
/** Read query value as a string. */
var str = function (input) {
    if (input instanceof Array)
        return input[0];
    if (typeof input === 'string')
        return input;
};
exports.str = str;
