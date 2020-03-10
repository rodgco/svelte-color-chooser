<script>
  import ColorChooser from "../lib/index.svelte";
</script>

<style>
  main {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>

<main>
  <ColorChooser
    color="#00ff00"
  />
</main>