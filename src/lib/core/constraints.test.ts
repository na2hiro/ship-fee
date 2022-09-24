import { describe, it, expect } from "vitest";
import {
  meetSizeConstraints,
  meetWeightConstraints,
  SizeConstraints,
} from "./constraints";

describe("meetWeightConstraints", () => {
  it("checks edgesSumMax", () => {
    expect(meetWeightConstraints(undefined, 10)).toBeTruthy();
    expect(meetWeightConstraints({ max: 5 }, 10)).toBeFalsy();
    expect(meetWeightConstraints({ max: 10 }, 10)).toBeTruthy();
    expect(meetWeightConstraints({ max: 15 }, 10)).toBeTruthy();
  });
});

describe("meetSizeConstraints", () => {
  const size1: [number, number, number] = [30, 20, 10];
  it("checks empty constraints", () => {
    expect(meetSizeConstraints(undefined, size1)).toBeTruthy();
  });
  it("checks edgesSumMax", () => {
    expect(meetSizeConstraints({ edgesSumMax: 50 }, size1)).toBeFalsy();
    expect(meetSizeConstraints({ edgesSumMax: 60 }, size1)).toBeTruthy();
    expect(meetSizeConstraints({ edgesSumMax: 70 }, size1)).toBeTruthy();
  });
  it("checks edgesMax", () => {
    expect(
      meetSizeConstraints({ edgesMax: [null, null, null] }, size1)
    ).toBeTruthy();
    expect(meetSizeConstraints({ edgesMax: [40, 30, 10] }, size1)).toBeTruthy();
    expect(meetSizeConstraints({ edgesMax: [20, 20, 20] }, size1)).toBeFalsy();
    expect(
      meetSizeConstraints({ edgesMax: [null, null, 5] }, size1)
    ).toBeFalsy();
  });
  it("doesn't check edgesMin for now", () => {
    expect(
      meetSizeConstraints({ edgesMin: [null, null, null] }, size1)
    ).toBeTruthy();
    expect(meetSizeConstraints({ edgesMin: [40, 30, 10] }, size1)).toBeTruthy();
    expect(meetSizeConstraints({ edgesMin: [20, 20, 20] }, size1)).toBeTruthy();
    expect(meetSizeConstraints({ edgesMin: [25, 15, 5] }, size1)).toBeTruthy();
    expect(
      meetSizeConstraints({ edgesMin: [null, null, 5] }, size1)
    ).toBeTruthy();
  });
  it("checks distorableEnvelope", () => {
    const constraints: SizeConstraints = { distortableEnvelope: [30, 20] };
    expect(meetSizeConstraints(constraints, [30, 20, 0])).toBeTruthy();
    expect(meetSizeConstraints(constraints, [29, 19, 1])).toBeTruthy();
    expect(meetSizeConstraints(constraints, [29, 19, 2])).toBeFalsy();
    expect(meetSizeConstraints(constraints, [20, 10, 10])).toBeTruthy();
    expect(meetSizeConstraints(constraints, [20, 10, 11])).toBeFalsy();
    expect(meetSizeConstraints(constraints, [11, 1, 19])).toBeTruthy();
  });
});
