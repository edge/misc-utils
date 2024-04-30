"use strict";
// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.str = exports.seq = exports.regexp = exports.optional = exports.oneOf = exports.numeric = exports.minLength = exports.min = exports.maxLength = exports.max = exports.integer = exports.hex = exports.exactLength = exports.eq = exports.email = exports.domain = exports.bool = exports.ValidateError = void 0;
/** Validation error thrown by `validate()`. Provides the failed parameter along with the error message. */
var ValidateError = /** @class */ (function (_super) {
    __extends(ValidateError, _super);
    function ValidateError(param, message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'ValidateError';
        _this.param = param;
        return _this;
    }
    return ValidateError;
}(Error));
exports.ValidateError = ValidateError;
/** Validate input is Boolean. */
var bool = function (input) {
    if (typeof input !== 'boolean')
        throw new Error('must be boolean');
};
exports.bool = bool;
/**
 * FQDN format expression.
 *
 * Based on https://stackoverflow.com/a/62917037/1717753
 */
var domainRegexp = /^((?=[a-z0-9-_]{1,63}\.)(xn--)?[a-z0-9_]+(-[a-z0-9_]+)*\.)+[a-z]{2,63}$/;
/**
 * Validate input is a fully-qualified domain name.
 * Implicitly validates `str()` for convenience.
 */
var domain = function (input) {
    (0, exports.str)(input);
    if (!domainRegexp.test(input))
        throw new Error('invalid domain');
};
exports.domain = domain;
/** Email format expression. */
var emailRegexp = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
/**
 * Validate input is an email address.
 * Implicitly validates `str()` for convenience.
 */
var email = function (input) {
    (0, exports.str)(input);
    if (!emailRegexp.test(input))
        throw new Error('invalid email address');
};
exports.email = email;
/** Validate input is exactly equal to a comparison value. */
var eq = function (cmp) { return function (input) {
    if (input !== cmp)
        throw new Error("must be ".concat(cmp));
}; };
exports.eq = eq;
/** Validate exact length of string. */
var exactLength = function (n) { return function (input) {
    if (input.length !== n)
        throw new Error("must contain exactly ".concat(n, " characters"));
}; };
exports.exactLength = exactLength;
/** Lowercase hexadecimal expression. */
var hexRegexp = /^[a-f0-9]*$/;
/**
 * Validate string is lowercase hexadecimal.
 * Implicitly validates `str()` for convenience.
 */
var hex = function (input) {
    (0, exports.str)(input);
    if (!hexRegexp.test(input))
        throw new Error('invalid characters');
};
exports.hex = hex;
/**
 * Validate input is an integer.
 * Implicitly validates `numeric()` for convenience.
 */
var integer = function (input) {
    (0, exports.numeric)(input);
    if (input.toString().indexOf('.') > -1)
        throw new Error('must be an integer');
};
exports.integer = integer;
/** Validate maximum number. */
var max = function (n) { return function (input) {
    if (input > n)
        throw new Error("must be no more than ".concat(n));
}; };
exports.max = max;
/** Validate maximum length of string. */
var maxLength = function (n) { return function (input) {
    if (input.length > n)
        throw new Error("must be no longer than ".concat(n, " characters"));
}; };
exports.maxLength = maxLength;
/** Validate minimum number. */
var min = function (n) { return function (input) {
    if (input < n)
        throw new Error("must be no less than ".concat(n));
}; };
exports.min = min;
/** Validate minimum length of string. */
var minLength = function (n) { return function (input) {
    if (input.length < n)
        throw new Error("must be no shorter than ".concat(n, " characters"));
}; };
exports.minLength = minLength;
/** Validate input is numeric. */
var numeric = function (input) {
    if (typeof input !== 'number')
        throw new Error('must be a number');
};
exports.numeric = numeric;
/** Validate input is one of a range of options. */
var oneOf = function (range) { return function (input) {
    if (!range.includes(input))
        throw new Error("must be one of: ".concat(range.join(', ')));
}; };
exports.oneOf = oneOf;
/**
 * Special non-validator that returns true if the input is null or undefined, and never throws an error.
 * Normally used with `seq()`.
 */
var optional = function (input) {
    if (input === null || input === undefined)
        return true;
};
exports.optional = optional;
/** Validate string against regular expression. */
var regexp = function (re) { return function (input) {
    if (!re.test(input))
        throw new Error('invalid characters');
}; };
exports.regexp = regexp;
/**
 * Sequentially runs multiple validation functions.
 * If a function returns true, for example `optional()`, subsequent validation is ignored.
 */
var seq = function () {
    var fs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fs[_i] = arguments[_i];
    }
    return function (input, origInput) {
        for (var i = 0; i < fs.length; i++) {
            if (fs[i](input, origInput))
                return;
        }
    };
};
exports.seq = seq;
/** Validate input is a string. */
var str = function (input) {
    if (typeof input !== 'string')
        throw new Error('must be a string');
};
exports.str = str;
/**
 * Read an unknown input and assert it matches an object specification.
 * This function immediately throws a ValidateError if any validation fails.
 * Otherwise, a typed copy of the input is returned.
 *
 * This method does not support validation across multiple properties or asynchronous validation.
 *
 * @todo Remove usage of `any` type.
 */
var validate = function (spec, parent) {
    if (parent === void 0) { parent = ''; }
    return function (input, origInput) {
        if (typeof input !== 'object' || input === null)
            throw new ValidateError('', 'no data');
        return Object.keys(spec).reduce(function (v, k) {
            var f = spec[k];
            var value = input[k];
            if (typeof f === 'function') {
                try {
                    f(value, origInput || input);
                    v[k] = value;
                }
                catch (err) {
                    var param = parent ? "".concat(parent, ".").concat(k) : k;
                    throw new ValidateError(param, err.message);
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            else
                v[k] = (0, exports.validate)(f, k)(value, origInput || input);
            return v;
        }, {});
    };
};
exports.validate = validate;
