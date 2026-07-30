import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
    backgroundColor: "#FFFFFF",
  },

  logo: {
    width: 150,
    height: 80,
    flex: 1,
    marginTop: 15,
    alignItems: "center",
  },
  icon: {
    marginRight: 12,
  },
});