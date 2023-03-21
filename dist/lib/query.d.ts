import { ParsedQs } from 'qs';
/** Sort direction. */
export type Direction = 'ASC' | 'DESC';
/** Query input type. Compatible with Express `req.query[name]` */
export type Input = undefined | string | string[] | ParsedQs | ParsedQs[];
/** Sort tuple. */
export type Sort<T extends string | number | symbol> = [T, Direction];
/** Boolean false value matches in query string. */
export declare const FALSE: string[];
/** Boolean true value matches in query string. */
export declare const TRUE: string[];
/** Read query value as a string array. */
export declare const array: (input: Input, def?: string[]) => string[];
/** Read query value as a Boolean. */
export declare const bool: (input: Input, def?: boolean) => boolean | undefined;
/**
 * Read query value as an integer number.
 * The value can optionally be bounded by `min` and `max` arguments.
 */
export declare const integer: (input: Input, min?: number, max?: number) => number | undefined;
/**
 * Read query value as a set of sort orders.
 * If a sort property is prefixed with a hyphen `-` the sort will be descending, otherwise ascending.
 */
export declare const sorts: <T extends Record<string, unknown>>(input: Input, allow: (keyof T)[], def?: Sort<keyof T> | Sort<keyof T>[] | undefined) => Sort<keyof T>[];
/** Read query value as a string. */
export declare const str: (input: Input) => string | undefined;
