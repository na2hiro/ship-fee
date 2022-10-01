import { writable } from "svelte/store";
import type { Item } from "../lib/core/item";

type ItemStore = {
  items: Item[];
  selectedIndex?: number;
};

const { subscribe, update } = writable<ItemStore>(
  JSON.parse(localStorage.ship_fee || '{"items":[]}')
);

subscribe((value) => {
  const { selectedIndex, ...v } = value;
  localStorage.ship_fee = JSON.stringify(v);
});

export default {
  subscribe,
  select: (i: number) => {
    update((u) => {
      u.selectedIndex = i;
      return u;
    });
  },
  updateItem: (index: number, item: Omit<Item, "uuid">) => {
    update((u) => {
      u.items[index] = {
        ...u.items[index],
        ...item,
      };
      u.selectedIndex = index;
      return u;
    });
  },
  addItem: (item: Item) => {
    update((u) => {
      u.items.push(item);
      u.selectedIndex = u.items.length - 1;
      return u;
    });
  },
  deleteItem: (index: number) => {
    update((u) => {
      u.items.splice(index, 1);
      u.selectedIndex = undefined;
      return u;
    });
  },
};
