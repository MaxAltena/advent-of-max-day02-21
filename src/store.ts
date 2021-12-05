import { writable, get } from "svelte/store";
import { tweened } from "svelte/motion";
import { sineInOut } from "svelte/easing";
import type { BaseItem, CartItem } from "./types";

export const taxRate = writable(0.09);
export const items = writable([
  {
    name: "French Fries with Ketchup",
    price: 2.23,
    image: "/images/plates/french-fries.png",
  },
  {
    name: "Salmon and Vegetables",
    price: 5.12,
    image: "/images/plates/salmon-vegetables.png",
  },
  {
    name: "Spaghetti with Meat Sauce",
    price: 7.82,
    image: "/images/plates/spaghetti-meat-sauce.png",
  },
  {
    name: "Chicken Salad with Parmesean",
    price: 6.98,
    image: "/images/plates/chicken-salad.png",
  },
  {
    name: "Fish Sticks and Fries",
    price: 6.34,
    image: "/images/plates/fish-sticks-fries.png",
  },
  {
    name: "Ravioli",
    price: 6.45,
    image: "/images/plates/ravioli.png",
  },
  {
    name: "Tortellini",
    price: 6.05,
    image: "/images/plates/tortellini.png",
  },
  {
    name: "Bacon, Eggs, and Toast",
    price: 5.99,
    image: "/images/plates/bacon-eggs.png",
  },
] as BaseItem[]);
export const cart = writable([] as CartItem[]);

export const subTotal = tweened(0, {
  duration: 500,
  easing: sineInOut,
});
export const tax = tweened(0, {
  duration: 500,
  easing: sineInOut,
});
export const total = tweened(0, {
  duration: 500,
  easing: sineInOut,
});

cart.subscribe((newCart) => {
  const subTotalAmount = newCart.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );
  subTotal.set(subTotalAmount);
  const taxAmount = subTotalAmount * get(taxRate);
  tax.set(taxAmount);
  const totalAmount = subTotalAmount + taxAmount;
  total.set(totalAmount);
});
