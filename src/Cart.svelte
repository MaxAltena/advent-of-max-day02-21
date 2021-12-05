<script lang="ts">
  import { cart, subTotal, tax, total } from "./store";
  import { round } from "./utils";
  import CartItem from "./CartItem.svelte";

  $: roundedSubTotal = () => round($subTotal).toFixed(2);
  $: roundedTax = () => round($tax).toFixed(2);
  $: roundedTotal = () => round($total).toFixed(2);
</script>

<section>
  <h2>Your Cart</h2>
  {#if $cart.length === 0}
    <p>Your cart is empty.</p>
  {:else}
    <div class="content">
      <div class="items">
        {#each $cart as item}
          <CartItem {item} />
        {/each}
      </div>

      <hr />

      <div class="prices">
        <span class="label">Subtotal:</span>
        <span class="amount">${roundedSubTotal()}</span>
        <span class="label">Tax:</span>
        <span class="amount">${roundedTax()}</span>
        <span class="label">Total:</span>
        <span class="amount amount--total">${roundedTotal()}</span>
      </div>
    </div>
  {/if}
</section>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  hr {
    width: 100%;
    height: 5px;
    border: none;
    background: #d7d7f9;
  }

  .prices {
    display: grid;
    grid-template-columns: 1fr auto;
    justify-items: flex-end;
    align-items: flex-end;
    gap: 1rem;
  }

  .label {
    font-family: var(--font-family);
    font-weight: bold;
    font-size: 1rem;
    line-height: 1rem;
  }

  .amount {
    font-family: var(--font-family);
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1.5rem;
    min-width: 8.5rem;
    text-align: right;
  }

  .amount--total {
    color: var(--primary);
    font-size: 2rem;
  }
</style>
