<script lang="ts">
  import { availableShipments } from "./core/constraints";
  import FeeDetails from "./FeeDetails.svelte";
  import SizeInput from "./SizeInput.svelte";
  import WeightInput from "./WeightInput.svelte";

  import itemsStore from "../stores/itemsStore";
  import ItemList from "./ItemList.svelte";
  import { equals } from "./core/item";

  let size1: number;
  let size2: number;
  let size3: number;
  let weight: number;

  const numberFormat = new Intl.NumberFormat();

  itemsStore.subscribe((items) => {
    const item = items.items[items.selectedIndex] ?? {};
    size1 = item.size1;
    size2 = item.size2;
    size3 = item.size3;
    weight = item.weight;
  });

  $: fees = availableShipments({
    size: [size1 ?? 0, size2 ?? 0, size3 ?? 0],
    weight: weight ?? 0,
  });
  $: selected = typeof $itemsStore.selectedIndex === "number";
  $: dirty = selected
    ? !equals($itemsStore.items[$itemsStore.selectedIndex], {
        size1,
        size2,
        size3,
        weight,
      })
    : [typeof size1, typeof size2, typeof size3, typeof weight].every(
        (type) => type === "number"
      );
</script>

<ItemList {...{ size1, size2, size3, weight, dirty }} />
<div class="inputs">
  <SizeInput bind:value={size1} />
  <SizeInput bind:value={size2} />
  <SizeInput bind:value={size3} />
  <WeightInput bind:value={weight} />
</div>
{#if fees.length > 0}
  <ul>
    {#each fees as fee, i (fee.name)}
      <li>
        <details>
          <summary
            >{numberFormat.format(fee.price)}円{i === 0 ? "（最安）" : ""}
            <a href={fee.detailsUrl} target="_blank">{fee.name}</a>
          </summary>
          <FeeDetails {...fee.constraints} />
        </details>
      </li>
    {/each}
  </ul>
{:else}
  <div style="margin: 2rem">発送方法が見つかりません</div>
{/if}

<style>
  .inputs {
    text-align: left;
    font-size: 2.5rem;
  }

  ul {
    text-align: left;
    list-style: none;
  }

  li {
    margin-bottom: 0.3rem;
  }

  li:first-child summary,
  li:first-child summary * {
    font-weight: bold;
  }
</style>
