<script lang="ts">
  import { tweened } from "svelte/motion";
  import { sineInOut } from "svelte/easing";

  import { cart } from "./store";
  import type { CartItem } from "./types";
  import { round } from "./utils";

  export let item: CartItem;

  const totalAmount = tweened(item.amount * item.price, {
    duration: 500,
    easing: sineInOut,
  });

  $: totalAmount.set(item.amount * item.price);

  $: confirmRemove = () => item.amount === 1;

  const removePlate = () => {
    cart.update((_cart) => {
      const index = _cart.findIndex((_item) => _item.name === item.name);

      _cart.splice(index, index + 1);

      return _cart;
    });
  };

  const minusPlate = () => {
    if (!confirmRemove()) {
      cart.update((_cart) => {
        _cart.find((_item) => _item.name === item.name).amount--;

        return _cart;
      });
    } else {
      removePlate();
    }
  };

  const plusPlate = () =>
    cart.update((_cart) => {
      _cart.find((_item) => _item.name === item.name).amount++;
      return _cart;
    });
</script>

<div class="item">
  <div class="image-container">
    <img src={item.image} alt={item.name} class="image" />
    <span class="image-count">{item.amount}</span>
  </div>
  <div class="item-content">
    <span class="name">{item.name}</span>
    <span class="price">${item.price}</span>

    <div class="item-content-bottom">
      <div class="edit">
        <button class="edit-minus" on:click={minusPlate}
          ><img src="/images/chevron.svg" alt="Arrow to the left" /></button
        >
        <span class="edit-amount">{item.amount}</span>
        <button class="edit-plus" on:click={plusPlate}
          ><img src="/images/chevron.svg" alt="Arrow to the right" /></button
        >
      </div>

      <div class="total-plate">
        <span>${round($totalAmount)}</span>
      </div>
    </div>
  </div>
</div>

<style scoped>
  .item {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .item:not(:first-child)::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    inset-inline: 0;
    inset-block-start: -0.75rem;
    background: #d7d7f9;
  }

  .image-container {
    width: 64px;
    height: 64px;
    aspect-ratio: 1 / 1;
    position: relative;
  }

  .image {
    width: 100%;
    height: 100%;
  }

  .image-count {
    position: absolute;
    display: block;
    inset: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 50%;
    background: black;
    color: white;
    border-radius: 50%;
    font-weight: bold;
    text-align: center;
    line-height: 2;
  }

  .item-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .price {
    font-weight: bold;
  }

  .item-content-bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .edit {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  button {
    border: none;
    background: var(--primary);
    color: white;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    width: 26px;
    height: 26px;
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: opacity 100ms ease-in-out;
  }

  .edit-amount {
    font-weight: bold;
    text-align: center;
    width: 1rem;
  }

  button img {
    width: 12px;
    height: 12px;
    aspect-ratio: 1 / 1;
    user-select: none;
    -webkit-user-drag: none;
  }

  button:hover {
    opacity: 0.8;
  }

  button:active {
    opacity: 0.9;
  }

  .edit-plus {
    transform: rotate(180deg);
  }

  .total-plate {
    font-weight: bold;
    font-size: 2rem;
  }
</style>
