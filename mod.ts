export const CHARACTERS =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/**
 * Encode a given positive integer in base62 format.
 * @param {number} n - The integer
 * @returns {string} - The encoded integer
 * @throws If provided value is not a supported numeric value (must be a
 * positive integer less than Number.MAX_SAFE_INTEGER).
 */
export function encode(n: number): string {
  if (typeof n !== "number" || !Number.isFinite(n)) {
    throw new TypeError(`Must provide a number: got ${n}`);
  }
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError(`Must provide a positive integer: got ${n}`);
  }
  if (n > Number.MAX_SAFE_INTEGER) {
    throw new RangeError(
      `Must provide an integer below Number.MAX_SAFE_INTEGER (${Number.MAX_SAFE_INTEGER}): got ${n}`,
    );
  }

  let result = "";
  do {
    result = `${CHARACTERS[n % 62]}${result}`;
    n = Math.floor(n / 62);
  } while (n > 0);
  return result;
}

/**
 * Decode a given base62 encoded string as a number.
 * @param {string} s - The string to decode.
 * @returns {number} - The decoded integer.
 * @throws If decoded value is greater than Number.MAX_SAFE_INTEGER.
 */
export function decode(s: string): number {
  let n = 0;
  let i = 0;
  const c = s.split("");

  while (c.length > 0) {
    n = n * 62 + CHARACTERS.indexOf(c.shift() ?? "Impossible");
    if (n > Number.MAX_SAFE_INTEGER) {
      throw new RangeError(`Value exceeds MAX_SAFE_INTEGER: ${s}`);
    }
    i++;
  }

  return n;
}

if (import.meta.main) {
  console.log(`This library encodes and decodes numbers in base62.`);
  console.log(`As an example: 1337 encodes to ${encode(1337)}`);
  console.log(`Additionally, ${encode(7331)} decodes to 7331`);
  console.log(
    `The largest number this library can can handle is ${Number.MAX_SAFE_INTEGER}`,
  );
  console.log(
    `That number encoded is ${
      encode(Number.MAX_SAFE_INTEGER)
    }, which decodes back to ${decode(encode(Number.MAX_SAFE_INTEGER))}.`,
  );
}
