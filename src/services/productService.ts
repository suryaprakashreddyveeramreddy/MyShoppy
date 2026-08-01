import { BASE_URL } from "../config/api";
import { Product } from "../types/product";

export const getProducts = async (
  category: string
): Promise<Product[]> => {
  const response = await fetch(
    `${BASE_URL}/products?category=${category}`
  );

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};

export const getProduct = async (
  productId: number
): Promise<Product> => {
  const response = await fetch(
    `${BASE_URL}/products/${productId}`
  );

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return await response.json();
};