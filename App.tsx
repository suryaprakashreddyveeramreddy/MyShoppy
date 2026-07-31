import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { CartProvider } from "./src/context/CartContext";
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <CartProvider>
       
      <AppNavigator />
      <StatusBar hidden />
      
    </CartProvider>
  );
}