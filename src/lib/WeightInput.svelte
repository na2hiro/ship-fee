<script>
  export let value;
</script>

<div>
  <input
    type="number"
    size="5"
    bind:value
    min="0"
    max="99999"
    placeholder="0"
    class="weight"
  />g
</div>

<style>
  div {
    display: inline-flex;
    align-items: center;
  }

  input {
    font-size: 2.5rem;
    text-align: right;
  }
</style>
