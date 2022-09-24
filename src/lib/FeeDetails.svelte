<script lang="ts">
  import { stringifyWeight } from "./core/utils";

  export let size;
  export let weight;

  $: maxXY = size.edgesMax
    ? stringifyXY(size.edgesMax[0], size.edgesMax[1])
    : null;
  $: maxZ = size.edgesMax?.[2] ? `厚さ${size.edgesMax[2]}cm` : null;
  $: minXY = size.edgesMin
    ? stringifyXY(size.edgesMin[0], size.edgesMin[1])
    : null;
  $: minZ = size.edgesMin?.[2] ? `厚さ${size.edgesMin[2]}cm` : null;
  $: maxSum = size.edgesSumMax ? `三辺合計${size.edgesSumMax}cm` : null;
  $: envelope = size.distortableEnvelope
    ? `${stringifyXY(
        size.distortableEnvelope[0],
        size.distortableEnvelope[1]
      )}の封筒(必要に応じ<a href="https://konpouman.com/letterpack-hako/" target="_blank">直方体に変形</a>)`
    : null;
  $: maxWeight = weight?.max ? `重さ${stringifyWeight(weight.max)}` : null;

  function stringifyXY(x, y) {
    if (x !== null) {
      if (y !== null) {
        return `${x}cm x ${y}cm`;
      }
      return `長辺${x}cm`;
    } else {
      if (y !== null) {
        return `短辺${y}cm`;
      }
      return null;
    }
  }
</script>

<ul>
  {#if maxXY}
    <li>{maxXY}まで</li>
  {/if}
  {#if envelope}
    <li>{@html envelope}</li>
  {/if}
  {#if maxZ}
    <li>{maxZ}まで</li>
  {/if}
  {#if maxSum}
    <li>{maxSum}まで</li>
  {/if}
  {#if maxWeight}
    <li>{maxWeight}まで</li>
  {/if}
  {#if minXY || minZ}
    <li>梱包時最低でも{[minXY, minZ].filter((a) => a).join("、")}必要</li>
  {/if}
</ul>
