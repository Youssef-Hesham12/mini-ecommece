export type CartProduct = {
  count: number;
  price: number;
  product: string;
};

export type CartData = {
  products: CartProduct[];
  totalCartPrice: number;
};

export type CartResponse = {
  status: "success";
  numOfCartItems: number;
  data: CartData;
};
