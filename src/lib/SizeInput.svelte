<script>
  export let value = undefined;
</script>

<div>
  <input
    type="number"
    size="3"
    bind:value
    min="0"
    max="999"
    placeholder="0"
  />cm
</div>

<style>
  div {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0.125rem
  }
  input {
    font-size: 2.5rem;
    text-align: right;
  }
</style>
