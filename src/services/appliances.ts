const API_KEY = "YOUR_BESTBUY_API_KEY";

const URL = `https://api.bestbuy.com/v1/products(categoryPath.id=abcat0900000)?apiKey=${API_KEY}&format=json&show=sku,name,salePrice,image,shortDescription&pageSize=20`;

export const getAppliances = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();

    return data.products;
  } catch (error) {
    console.log(error);
    return [];
  }
};