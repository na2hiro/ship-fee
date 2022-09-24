<script lang="ts">
  import { availableShipments } from "./core/constraints";
  import FeeDetails from "./FeeDetails.svelte";
  import SizeInput from "./SizeInput.svelte";
  import WeightInput from "./WeightInput.svelte";

  let size1: number;
  let size2: number;
  let size3: number;
  let weight: number;

  $: fees = availableShipments({
    size: [size1 ?? 0, size2 ?? 0, size3 ?? 0],
    weight: weight ?? 0,
  });
</script>

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
            >{fee.price}円{i === 0 ? "（最安）" : ""}
            <a href={fee.detailsUrl} target="_blank">{fee.name}</a>
          </summary>
          <FeeDetails {...fee.constraints} />
        </details>
      </li>
    {:else}{/each}
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

  li:first-child summary {
    font-weight: bold;
  }
</style>
