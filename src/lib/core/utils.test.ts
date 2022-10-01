import { it, expect } from "vitest";
import { stringifyWeight, stringifyXY, stringifyZ } from "./utils";

it("stringifyWeight", () => {
  expect(stringifyWeight(0)).toBe("0g");
  expect(stringifyWeight(100)).toBe("100g");
  expect(stringifyWeight(999)).toBe("999g");
  expect(stringifyWeight(1000)).toBe("1kg");
  expect(stringifyWeight(1100)).toBe("1.1kg");
  expect(stringifyWeight(25000)).toBe("25kg");
});

it("stringifyXY", () => {
  expect(stringifyXY(null, null)).toMatchInlineSnapshot("null");
  expect(stringifyXY(10, null)).toMatchInlineSnapshot('"長辺10cm"');
  expect(stringifyXY(null, 10)).toMatchInlineSnapshot('"短辺10cm"');
  expect(stringifyXY(20, 10)).toMatchInlineSnapshot('"20cm x 10cm"');
});

it("stringifyX", () => {
  expect(stringifyZ(null)).toMatchInlineSnapshot("null");
  expect(stringifyZ(10)).toMatchInlineSnapshot('"厚さ10cm"');
});
