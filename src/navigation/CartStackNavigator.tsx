import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

export type CartStackParamList = {
  CartScreen: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
      />
    </Stack.Navigator>
  );
}