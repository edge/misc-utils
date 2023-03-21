/**
 * Validation specification.
 * Given an object type, a specification outline is derived to ensure that validation is defined for all scalar
 * properties.
 *
 * If a property is array-type, a single validator must be specified which receives the entire array.
 * If a property is otherwise object-type, the validation spec extends deeply into it.
 *
 * Optional properties must still be specified; the `optional()` function can be used to allow them to be skipped if
 * the value is undefined.
 */
export type Spec<T> = T extends Array<unknown> ? ValidateFn : T extends object ? {
    [P in keyof Required<T>]: Spec<T[P]>;
} : ValidateFn;
/** Validation error thrown by `validate()`. Provides the failed parameter along with the error message. */
export declare class ValidateError extends Error {
    param: string;
    constructor(param: string, message: string);
}
/**
 * A validation function takes any input and throws an error if it does not satisfy the relevant condition.
 *
 * It may return `true` signifying that further validation is not required; see `seq()` for more detail.
 *
 * When used in conjunction with `validate()` to parse an object, an `origInput` is also passed giving the entire
 * data object.
 * This can be used to validate one property based on the value of another, though as the type of the parent input
 * is `unknown` knowledge of the structure has to be asserted by the caller.
 */
export type ValidateFn = (input: unknown, origInput?: unknown) => true | void;
/** Validate input is Boolean. */
export declare const bool: ValidateFn;
/**
 * Validate input is a fully-qualified domain name.
 * Implicitly validates `str()` for convenience.
 */
export declare const domain: ValidateFn;
/**
 * Validate input is an email address.
 * Implicitly validates `str()` for convenience.
 */
export declare const email: ValidateFn;
/** Validate input is exactly equal to a comparison value. */
export declare const eq: <T>(cmp: T) => ValidateFn;
/** Validate exact length of string. */
export declare const exactLength: (n: number) => ValidateFn;
/**
 * Validate string is lowercase hexadecimal.
 * Implicitly validates `str()` for convenience.
 */
export declare const hex: ValidateFn;
/**
 * Validate input is an integer.
 * Implicitly validates `numeric()` for convenience.
 */
export declare const integer: ValidateFn;
/** Validate maximum number. */
export declare const max: (n: number) => ValidateFn;
/** Validate maximum length of string. */
export declare const maxLength: (n: number) => ValidateFn;
/** Validate minimum number. */
export declare const min: (n: number) => ValidateFn;
/** Validate minimum length of string. */
export declare const minLength: (n: number) => ValidateFn;
/** Validate input is numeric. */
export declare const numeric: ValidateFn;
/** Validate input is one of a range of options. */
export declare const oneOf: <T>(range: T[]) => ValidateFn;
/**
 * Special non-validator that returns true if the input is null or undefined, and never throws an error.
 * Normally used with `seq()`.
 */
export declare const optional: ValidateFn;
/** Validate string against regular expression. */
export declare const regexp: (re: RegExp) => ValidateFn;
/**
 * Sequentially runs multiple validation functions.
 * If a function returns true, for example `optional()`, subsequent validation is ignored.
 */
export declare const seq: (...fs: ValidateFn[]) => ValidateFn;
/** Validate input is a string. */
export declare const str: ValidateFn;
/**
 * Read an unknown input and assert it matches an object specification.
 * This function immediately throws a ValidateError if any validation fails.
 * Otherwise, a typed copy of the input is returned.
 *
 * This method does not support validation across multiple properties or asynchronous validation.
 *
 * @todo Remove usage of `any` type.
 */
export declare const validate: <T extends object>(spec: Spec<Required<T>>, parent?: string) => (input: unknown, origInput?: unknown) => T;
