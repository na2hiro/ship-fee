import { it, expect } from "vitest";
import { stringifyWeight } from "./utils";

it("strinfigyWeight", () => {
  expect(stringifyWeight(0)).toBe("0g");
  expect(stringifyWeight(100)).toBe("100g");
  expect(stringifyWeight(999)).toBe("999g");
  expect(stringifyWeight(1000)).toBe("1kg");
  expect(stringifyWeight(1100)).toBe("1.1kg");
  expect(stringifyWeight(25000)).toBe("25kg");
});
