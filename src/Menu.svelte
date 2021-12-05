<script lang="ts">
  import { cart, items } from "./store";
  import type { BaseItem } from "./types";

  import { crossfade } from "svelte/transition";
  import { sineInOut } from "svelte/easing";

  const [send, receive] = crossfade({
    duration: 300,
    easing: sineInOut,
  });

  const addToCart = (item: BaseItem) => {
    cart.update((_cart) => [..._cart, { ...item, amount: 1 }]);
  };
</script>

<section>
  <h2>To Go Menu</h2>
  <div class="plates">
    {#each $items as item}
      <div class="plate">
        <img src={item.image} alt={item.name} class="image" />
        <h3 class="name">{item.name}</h3>
        <strong class="price">${item.price}</strong>
        {#if $cart.find((_cartItem) => _cartItem.name === item.name)}
          <button
            disabled
            class="in-cart"
            on:click={() => addToCart(item)}
            in:send={{ key: "in-cart" }}
            out:receive={{ key: "add-to-cart" }}
            ><img src="/images/check.svg" alt="Check" /><span>In Cart</span
            ></button
          >
        {:else}
          <button
            class="add-to-cart"
            on:click={() => addToCart(item)}
            in:send={{ key: "add-to-cart" }}
            out:receive={{ key: "in-cart" }}>Add to Cart</button
          >
        {/if}
      </div>
    {/each}
  </div>
</section>

<style scoped>
  .plates {
    display: flex;
    flex-direction: column;
    margin-block-start: 1rem;
    gap: 1rem;
  }

  .plate {
    position: relative;
    border-radius: 20px;
    min-height: 150px;
    width: 120%;
    margin-block-start: 2rem;
    padding-inline-start: calc(125px + 1rem);
    padding-inline-end: calc(12.5% + 1rem);
    padding-block: 2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .plate:nth-of-type(4n + 1) {
    background: var(--pattens-blue);
  }

  .plate:nth-of-type(4n + 2) {
    background: var(--pale-rose);
  }

  .plate:nth-of-type(4n + 3) {
    background: var(--ghost-white);
  }

  .plate:nth-of-type(4n) {
    background: var(--white-ice);
  }

  .image {
    position: absolute;
    inset-inline-start: -1.5rem;
    inset-block-start: -1.5rem;
    width: 150px;
    height: 150px;
    aspect-ratio: 1 / 1;
    user-select: none;
    -webkit-user-drag: none;
  }

  .name {
    font-weight: normal;
    font-family: var(--font-family);
    font-size: 1.2rem;
  }

  .price {
    font-weight: bold;
    font-family: var(--font-family);
    font-size: 2rem;
  }

  button {
    position: absolute;
    bottom: 0;
    transform: translateY(35%);
    border-radius: 9999px;
    border: none;
    color: white;
    font-family: var(--font-family);
    font-weight: bold;
    padding: 0.25rem 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
  }

  .in-cart {
    background: black;
  }

  .in-cart img {
    width: 1rem;
    height: 1rem;
    user-select: none;
    -webkit-user-drag: none;
  }

  .add-to-cart {
    background: var(--primary);
  }

  button[disabled] {
    cursor: auto;
  }
</style>
