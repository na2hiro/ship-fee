import { fees } from "./feeDb";
import type { FeeDefinition } from "./feeDb";

export type Size = number | null;
export type SizeConstraints = {
  /**
   * 辺の大きさの最大、最大辺から順に指定（３つめは厚さ）
   * nullは無制限
   */
  edgesMax?: [Size, Size, Size];

  /**
   * 直方体に変形できる封筒
   */
  distortableEnvelope?: [number, number];

  /**
   * 辺の大きさの最小、最大辺から順に指定（３つめは厚さ）
   * nullは無制限
   */
  edgesMin?: [Size, Size, Size];

  /**
   * ３辺合計の最大。
   */
  edgesSumMax?: number;
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

  if (constraints.distortableEnvelope) {
    const [x, y] = constraints.distortableEnvelope;
    if (x - Z < X) return false;
    if (y - Z < Y) return false;
  }

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
