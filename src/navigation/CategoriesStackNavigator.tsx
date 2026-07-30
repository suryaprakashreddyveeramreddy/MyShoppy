import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesScreen from "../screens/CategoriesScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

const Stack = createNativeStackNavigator();

export default function CategoriesStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="CategoriesHome"
        component={CategoriesScreen}
      />

      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
}