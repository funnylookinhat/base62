import { assertEquals, assertThrows } from "@std/assert";
import { decode, encode } from "./mod.ts";

Deno.test("encode should encode numbers correctly", () => {
  assertEquals(encode(0), "0");
  assertEquals(encode(1), "1");
  assertEquals(encode(61), "z");
  assertEquals(encode(62), "10");
  assertEquals(encode(124), "20");
  assertEquals(encode(3843), "zz");
  assertEquals(encode(238328), "1000");
  assertEquals(encode(Number.MAX_SAFE_INTEGER), "fFgnDxSe7");
});

Deno.test("decode should decode base62 strings correctly", () => {
  assertEquals(decode("0"), 0);
  assertEquals(decode("1"), 1);
  assertEquals(decode("z"), 61);
  assertEquals(decode("10"), 62);
  assertEquals(decode("20"), 124);
  assertEquals(decode("zz"), 3843);
  assertEquals(decode("1000"), 238328);
  assertEquals(decode("fFgnDxSe7"), Number.MAX_SAFE_INTEGER);
});

// This test is a bit extraneous, but it's an easy way to test the range.
Deno.test("decode should reverse encode", () => {
  for (let i = 42; i < Number.MAX_SAFE_INTEGER; i += i * 2) {
    assertEquals(decode(encode(i)), i);
  }
});

Deno.test("encode should throw if number exceeds MAX_SAFE_INTEGER", () => {
  assertThrows(
    () => encode(Number.MAX_SAFE_INTEGER + 1),
    RangeError,
    `Must provide an integer below Number.MAX_SAFE_INTEGER (${Number.MAX_SAFE_INTEGER}): got ${(Number
      .MAX_SAFE_INTEGER + 1)}`,
  );
});
