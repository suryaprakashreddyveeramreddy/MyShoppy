const BASE_URL = "https://dummyjson.com";

export const getFurnitureProducts = async () => {
  const response = await fetch(
    `${BASE_URL}/products/category/furniture`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};