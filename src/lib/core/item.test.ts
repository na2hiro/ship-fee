import { it, expect } from "vitest";
import { equals } from "./item";

it("equals", () => {
  expect(
    equals(
      {
        size1: undefined,
        size2: undefined,
        size3: undefined,
        weight: undefined,
      },
      {
        size1: undefined,
        size2: undefined,
        size3: undefined,
        weight: undefined,
      }
    )
  ).toBeTruthy();
  expect(
    equals(
      {
        size1: 123,
        size2: undefined,
        size3: undefined,
        weight: undefined,
      },
      {
        size1: 123,
        size2: undefined,
        size3: undefined,
        weight: 1,
      }
    )
  ).toBeFalsy();
  expect(
    equals(
      {
        size1: 123,
        size2: 45,
        size3: 67,
        weight: 890,
      },
      {
        size1: 123,
        size2: 45,
        size3: 67,
        weight: 890,
      }
    )
  ).toBeTruthy();
});
