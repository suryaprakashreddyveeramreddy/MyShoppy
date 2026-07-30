import { NavigatorScreenParams } from "@react-navigation/native";

export type CategoriesStackParamList = {
  CategoriesHome: undefined;
  ProductList: {
    category: string;
    title: string;
  };
  ProductDetails: {
    productId: number;
  };
};

export type CartStackParamList = {
  CartHome: undefined;
  OrderSuccess: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Categories: NavigatorScreenParams<CategoriesStackParamList>;
  Cart: NavigatorScreenParams<CartStackParamList>;
};