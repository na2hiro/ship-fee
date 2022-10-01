<script lang="ts">
  import {stringifyWeight, stringifyXY, stringifyZ} from "./core/utils";

  export let size = undefined;
  export let weight = undefined;

  $: maxXY = stringifyXY(size?.edgesMax?.[0], size?.edgesMax?.[1]);
  $: maxZ = stringifyZ(size?.edgesMax?.[2]);
  $: minXY = stringifyXY(size?.edgesMin?.[0], size?.edgesMin?.[1]);
  $: minZ = stringifyZ(size?.edgesMin?.[2]);
  $: maxSum = size?.edgesSumMax ? `三辺合計${size!.edgesSumMax}cm` : null;
  $: envelope = size?.distortableEnvelope
    ? `${stringifyXY(
        size!.distortableEnvelope[0],
        size!.distortableEnvelope[1]
      )}の封筒(必要に応じ<a href="https://konpouman.com/letterpack-hako/" target="_blank">直方体に変形</a>)`
    : null;
  $: maxWeight = stringifyWeight(weight?.max);
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
    <li>重さ{maxWeight}まで</li>
  {/if}
  {#if minXY || minZ}
    <li>梱包時最低でも{[minXY, minZ].filter((a) => a).join("、")}必要</li>
  {/if}
</ul>
