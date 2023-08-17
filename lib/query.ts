// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { ParsedQs } from 'qs'

/** Sort direction. */
export type Direction = 'ASC' | 'DESC'

/** Query input type. Compatible with Express `req.query[name]` */
export type Input = undefined | string | string[] | ParsedQs | ParsedQs[]

/** Sort tuple. */
export type Sort<T extends string | number | symbol> = [T, Direction]

/** Boolean false value matches in query string. */
export const FALSE = ['0', 'no', 'off', 'false']

/** Valid sort expression. */
const SORT_REGEXP = /^-?[a-zA-Z0-9._]+$/

/** Boolean true value matches in query string. */
export const TRUE = ['1', 'on', 'yes', 'true']

/** Read query value as a string array. */
export const array = (input: Input, def?: string[]): string[] => {
  if (input instanceof Array) return input as string[]
  if (typeof input === 'string') return [input]
  return def || []
}

/** Read query value as a Boolean. */
export const bool = (input: Input, def?: boolean): boolean | undefined => {
  if (typeof input !== 'string') return def
  if (TRUE.includes(input)) return true
  if (FALSE.includes(input)) return false
  return def
}

/**
 * Read query value as an integer number.
 * The value can optionally be bounded by `min` and `max` arguments.
 */
export const integer = (input: Input, min?: number, max?: number): number | undefined => {
  if (input instanceof Array) return integer(input[0], min, max)
  if (typeof input !== 'string') return
  let n = parseInt(input)
  if (isNaN(n)) return
  if (min !== undefined) n = Math.max(n, min)
  if (max !== undefined) n = Math.min(n, max)
  return n
}

/**
 * Read query value as a set of sort orders.
 * If a sort property is prefixed with a hyphen `-` the sort will be descending, otherwise ascending.
 */
export const sorts = <T extends Record<string, unknown>>(
  input: Input,
  allow: (keyof T)[],
  def?: Sort<keyof T>[] | Sort<keyof T>
): Sort<keyof T>[] => {
  if (input instanceof Array) {
    return (input as string[])
      .filter(v => SORT_REGEXP.test(v))
      .map<[keyof T, Direction]>(v => v[0] === '-' ? [v.slice(1), 'DESC'] : [v, 'ASC'])
      .filter(([prop]) => allow.includes(prop))
  }
  else if (typeof input === 'string') {
    const [prop, dir] = input[0] === '-' ? [input.slice(1), 'DESC' as Direction] : [input, 'ASC' as Direction]
    if (allow.includes(prop)) return [[prop, dir]]
    return []
  }
  if (def instanceof Array) {
    if (def[0] instanceof Array) return def as Sort<keyof T>[]
    else return [def as Sort<keyof T>]
  }
  return []
}

/** Read query value as a string. */
export const str = (input: Input): string | undefined => {
  if (input instanceof Array) return input[0] as string
  if (typeof input === 'string') return input
}
