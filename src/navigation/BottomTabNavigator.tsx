import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import CategoriesStackNavigator from "./CategoriesStackNavigator";
import CartStackNavigator from "./CartStackNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#E5E5E5",

        tabBarStyle: {
          backgroundColor: "#5F7F86",
          height: 70,
          paddingTop: 8,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;

            case "Categories":
              iconName = "grid";
              break;

            case "Cart":
              iconName = "cart";
              break;

            default:
              iconName = "ellipse";
          }

          return (
            <Ionicons
              name={iconName}
              size={26}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesStackNavigator}
      />

      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
      />
    </Tab.Navigator>
  );
}