export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
}
export interface CartItem extends Product {
  quantity: number;
}