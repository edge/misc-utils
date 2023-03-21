// Copyright (C) 2023 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

export * as cycle from './cycle'
export * as http from './http'
export * as query from './query'
export * as validate from './validate'

/** Identity function. */
export const identity = <T>(data: T) => data
