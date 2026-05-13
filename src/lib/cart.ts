import { apiV2 } from "@/lib/axios";
import type { CartResponse } from "@/types/cart.response.interface";

export async function getCart(token: string) {
  const { data } = await apiV2.get<CartResponse>("/cart", {
    headers: {
      token,
    },
  });

  return data;
}
