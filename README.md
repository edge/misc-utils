<img src="https://cdn.edge.network/assets/img/edge-logo-green.svg" width="200">

# Edge API Standard Development Kit

Provides commonly-used tools across Edge API products

## Overview

### cycle

[cycle](./lib/cycle.ts) provides a simple wrapper for background jobs.

```ts
import { cycle } from '@edge/api-sdk'

const hello: cycle.Job = {
  name: 'hello',
  interval: 2000,
  async do() {
    console.log('Hello')
  }
}
cycle.run([hello]).catch(err => console.error(err))
```

### http

[http](./lib/http.ts) provides convenience methods for Express-based JSON APIs.

```ts
import { RequestHandler } from 'express'
import { http as sdkHttp } from '@edge/api-sdk'

const handler: RequestHandler = (req, res, next) => {
  sdkHttp.notFound(res, next, { reason: 'this is just a README demonstration' })
}
```

### query

[query](./lib/query.ts) provides type-safe access to query string data.

```ts
import { RequestHandler } from 'express'
import { query } from '@edge/api-sdk'

const handler: RequestHandler = (req, res, next) => {
  const page = query.integer(req.query.page, 1) || 1
  res.send(`Page ${page}`)
  next()
}
```

### validate

[validate](./lib/validate.ts) provides a basic validation library, plus a powerful `validate()` function that sanitises input. This is particularly useful for Express-based JSON APIs.

```ts
import { RequestHandler } from 'express'
import { validate as v } from '@edge/api-sdk'

const handler = (): RequestHandler => {
  type Data = {
    name: string
  }
  const readBody = v.validate<Data>({
    name: v.seq(v.str, v.minLength(1), v.maxLength(256))
  })
  return (req, res, next) => {
    try {
      const data = readBody(req.body)
      res.json(data)
      next()
    }
    catch (err) {
      next(err)
    }
  }
}
```

### Miscellaneous

`identity()` provides a simple identity function, which can be useful for e.g. dereferencing arrays:

```ts
import { identity } from '@edge/api-sdk'

const a = [1, 2, 3]
const b = a.map(identity)
a.push(4)
console.log(a, b) // [ 1, 2, 3, 4 ] [ 1, 2, 3 ]
```

`unique()` provides a simple way to isolate unique values.

```ts
import { unique } from '@edge/api-sdk'

const ids = ['abc', 'def', 'def', 'ghi'].filter(unique)
console.log(ids) // [ 'abc', 'def', 'ghi' ]
```

## Contributing

Interested in contributing to the project? Amazing! Before you do, please have a quick look at our [Contributor Guidelines](CONTRIBUTING.md) where we've got a few tips to help you get started.

## License

Edge is the infrastructure of Web3. A peer-to-peer network and blockchain providing high performance decentralised web services, powered by the spare capacity all around us.

Copyright notice
(C) 2023 Edge Network Technologies Limited <support@edge.network><br />
All rights reserved

This product is part of Edge.
Edge is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version ("the GPL").

**If you wish to use Edge outside the scope of the GPL, please contact us at licensing@edge.network for details of alternative license arrangements.**

**This product may be distributed alongside other components available under different licenses (which may not be GPL). See those components themselves, or the documentation accompanying them, to determine what licenses are applicable.**

Edge is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

The GNU General Public License (GPL) is available at: https://www.gnu.org/licenses/gpl-3.0.en.html<br />
A copy can be found in the file GPL.md distributed with
these files.

This copyright notice MUST APPEAR in all copies of the product!
