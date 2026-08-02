import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/colors";

export default function AppHeader() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Right Icons */}
      <View style={styles.rightIcons}>
        <Ionicons
          name="cellular"
          size={22}
          color={Colors.primary}
          style={styles.icon}
        />

        <Ionicons
          name="battery-full"
          size={22}
          color={Colors.primary}
          style={styles.icon}
        />

        <MaterialCommunityIcons
          name="account-circle"
          size={32}
          color={Colors.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    elevation: 3,
  },

  logo: {
    width: 150,
    height: 80,
  },

  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: 14,
  },
});