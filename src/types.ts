export interface BaseItem {
  name: string;
  price: number;
  image: string;
}

export interface CartItem extends BaseItem {
  amount: number;
}
