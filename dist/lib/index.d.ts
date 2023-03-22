export * as cycle from './cycle';
export * as http from './http';
export * as query from './query';
export * as validate from './validate';
/** Identity function. */
export declare const identity: <T>(data: T) => T;
/** Simple uniqueness filter. */
export declare const unique: <T>(v: T, i: number, arr: T[]) => boolean;
