import React from "react";
import { SafeAreaView, View, Image, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import { useEffect } from "react";
import { Colors } from "../constants/colors";


export default function HomeScreen() {
  useEffect(() => {
  console.log("HomeScreen");
}, []);
  return (
    
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/images/home.png")}
          style={styles.homeImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomSpace} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  imageContainer: {
    flex: 8.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  homeImage: {
    width: "106%",
    height: "100%",
  },

  bottomSpace: {
    flex: 1.5,
    backgroundColor: Colors.background,
  },
});