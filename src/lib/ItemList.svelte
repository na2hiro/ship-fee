<script lang="ts">
  import itemsStore from "../stores/itemsStore";
  import { stringifyWeight } from "./core/utils";

  export let dirty;

  export let size1: number;
  export let size2: number;
  export let size3: number;
  export let weight: number;
</script>

<div class="container">
  {#each $itemsStore.items as item, i}
    <div class:selected={$itemsStore.selectedIndex === i} class:dirty>
      <button class="item" on:click={() => itemsStore.select(i)}>
        {#if item.name}
          <div class="name">{item.name}</div>
        {/if}
        {item.size1 ?? "0"} x {item.size2 ?? "0"} x {item.size3 ?? "0"}, {stringifyWeight(
          item.weight
        ) ?? "0g"}
      </button>
      <div class="control">
        <div>
          <button
            class="save"
            on:click={() => {
              itemsStore.updateItem(i, { size1, size2, size3, weight });
            }}
            >保存
          </button>
          <button
            class="delete"
            on:click={() => {
              if (confirm("削除しますか？")) {
                itemsStore.deleteItem(i);
              }
            }}
            >x
          </button>
        </div>
      </div>
    </div>
  {/each}
  <div class="new" class:visible={dirty}>
    <button
      class="item"
      on:click={() => {
        const name = prompt("品名をメモしておく");
        if (name === null) return;
        itemsStore.addItem({
          uuid: Date.now().toString(),
          size1,
          size2,
          size3,
          weight,
          name,
        });
      }}
    >
      {typeof $itemsStore.selectedIndex === "number" ? "新規保存" : "保存"}
    </button>
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    grid-auto-rows: minmax(100px, auto);
    padding-left: 0;
    margin-bottom: 1rem;
  }

  button.item {
    border: 0.125rem lightgray solid;
    padding: 0.25rem;
    flex: 1;
  }

  .container > div {
    position: relative;
    display: flex;
  }

  .selected button.item {
    border-color: #646cff;
  }

  .selected button.delete {
    display: block;
  }

  .control {
    position: absolute;
    top: 0.125rem;
    right: 0.125rem;
    opacity: 0.9;
  }

  .control > div {
    display: inline-flex;
  }

  .control button {
    height: 1.5rem;
    /*width: 1.5rem;*/
    line-height: 1rem;
    padding: 0.125rem;
    margin: 0.125rem;
    border: 0.0625rem lightgray solid;
    border-radius: 0.25rem;
  }

  .delete {
    display: none;
  }

  .save {
    display: none;
  }
  .selected.dirty .save {
    display: inline-block;
  }

  .name {
    font-weight: bold;
  }

  div.new {
    visibility: hidden;
  }

  div.new.visible {
    visibility: visible;
  }

  div.new > button {
    border: 0.175rem lightgray dashed;
  }
</style>
