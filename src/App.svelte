<script lang="ts">
  import Background from "./Background.svelte";
  import Menu from "./Menu.svelte";
  import Cart from "./Cart.svelte";
</script>

<main>
  <div class="wrapper">
    <Menu />

    <Cart />
  </div>

  <Background />
</main>

<style>
  main {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    padding: 2rem;
  }

  .wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    z-index: 1;
    max-width: 800px;
    max-height: calc(100vh - 4rem);
  }

  @media only screen and (max-width: 860px) {
    .wrapper {
      flex-direction: column;
      align-items: stretch;
      max-width: 375px;
    }
  }

  :global(section) {
    border-radius: 25px;
    background: white;
    box-shadow: 0px 0px 70px #c7cbe3;
    flex-grow: 1;
    padding: 2rem;
    max-width: 375px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  }

  :global(h2) {
    font-weight: bold;
    font-family: var(--font-family);
    font-size: 2rem;
  }
</style>
