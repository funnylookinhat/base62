# Encode / Decode Numbers in Base62

Basic package that was mostly an excuse to work through the process of
publishing to jsr.io. This exposes two methods that allow converting the
`Number` type to a base62 encoded string and back to a `Number`.

It currently only supports positive integers that can fit in the `Number` type.
There is a maximum supported numeric value of `9007199254740991`
(`Number.MAX_SAFE_INTEGER`). There's no reason this couldn't also support the
BigInt type. That can be a future addition!

## API

### encode(n: number): string

Encodes a given number to a base62 encoded string.

### decode(s: string): number

Decodes a given base62 encoded string to a number.

## Examples

```javascript
import { decode, encode } from "@funnylookinhat/base62";

const n = 42;
console.log(
  `The Answer to the Ultimate Question of Life, the Universe, and Everything is ${
    encode(n)
  } (${decode(encode(n))})`,
);
```
