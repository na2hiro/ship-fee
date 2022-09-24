import { fees } from "./feeDb";
import type { FeeDefinition } from "./feeDb";

export type Size = number | null;
export type SizeConstraints = {
  edgesMax?: [Size, Size, Size];
  edgesMin?: [Size, Size, Size];
  edgesSumMax?: Size;
};
export type WeightConstraints = {
  max: number;
};

export function meetSizeConstraints(
  constraints: SizeConstraints | undefined,
  size: [number, number, number]
) {
  if (!constraints) return true;
  const [X, Y, Z] = size.slice().sort((a, b) => b - a);

  if (constraints.edgesMax) {
    const [x, y, z] = constraints.edgesMax;
    if (x !== null && x < X) return false;
    if (y !== null && y < Y) return false;
    if (z !== null && z < Z) return false;
  }

  // TODO: show caveat to make edges longer
  /*if (constraints.edgesMin) {
      const [x, y, z] = constraints.edgesMin;
      if (x !== null && X < x) return false;
      if (y !== null && Y < y) return false;
      if (z !== null && Z < z) return false;
    }*/

  if (constraints.edgesSumMax && constraints.edgesSumMax < X + Y + Z)
    return false;

  return true;
}

export function meetWeightConstraints(
  constraints: WeightConstraints | undefined,
  weight: number
) {
  if (!constraints) return true;
  return weight <= constraints.max;
}

type Product = {
  name?: string;
  size: [number, number, number];
  weight: number;
};

export function availableShipments(product: Product): FeeDefinition[] {
  return fees.filter(
    (fee) =>
      meetSizeConstraints(fee.constraints.size, product.size) &&
      meetWeightConstraints(fee.constraints.weight, product.weight)
  );
}
