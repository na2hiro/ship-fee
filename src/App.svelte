<script lang="ts">
  import Calculator from "./lib/Calculator.svelte";
</script>

<main>
  <h1>
    🚢
    <wbr />
    メルカリ送料
  </h1>

  <Calculator />
</main>
<footer>
  <p>
    不正確なデータ、機能の要望などは<a
      href="https://twitter.com/na2hiro"
      target="_blank">@na2hiro</a
    >まで
  </p>
  <p style="margin-bottom: 0">
    2022 &copy; <a href="https://twitter.com/na2hiro" target="_blank"
      >@na2hiro</a
    >, <a href="https://twemoji.twitter.com/" target="_blank">twemoji</a>
  </p>
</footer>

<style>
  h1 {
    font-size: 3.2em;
    line-height: 1.1;
    word-break: keep-all;
    overflow-wrap: break-word;
    margin-top: 0;
  }
</style>
