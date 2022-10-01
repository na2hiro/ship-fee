export function stringifyWeight(weight: number | undefined) {
  if (typeof weight !== "number") return null;
  return `${stringifyWeightInner(weight)}`;
}

function stringifyWeightInner(weight: number) {
  if (weight >= 1000) return `${weight / 1000}kg`;
  return `${weight}g`;
}

export function stringifyXY(x: number | undefined | null, y: number | undefined | null) {
  if (typeof x === "number") {
    if (typeof y === "number") {
      return `${x}cm x ${y}cm`;
    }
    return `長辺${x}cm`;
  } else {
    if (typeof y === "number") {
      return `短辺${y}cm`;
    }
    return null;
  }
}

export function stringifyZ(z: number | undefined | null) {
  if (typeof z !== "number") {
    return null;
  }
  return `厚さ${z}cm`;
}
