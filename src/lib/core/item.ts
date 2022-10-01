export type Item = {
  uuid: string;
  name?: string;
  size1: number;
  size2: number;
  size3: number;
  weight: number;
};

export function equals(item1: Omit<Item, "uuid">, item2: Omit<Item, "uuid">) {
  return (
    item1.size1 === item2.size1 &&
    item1.size2 === item2.size2 &&
    item1.size3 === item2.size3 &&
    item1.weight === item2.weight
  );
}
