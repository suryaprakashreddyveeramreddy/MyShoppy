import React from "react";
import {SafeAreaView,View,Text,StyleSheet,FlatList,TouchableOpacity,Image,} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
import { useEffect } from "react";

const categories = [
  {
    id: "1",
    title: "Furniture",
    image: require("../../assets/images/furniture.png"),
    apiCategory: "Furniture",
  },
  {
    id: "2",
    title: "Mobiles",
    image: require("../../assets/images/mobile.png"),
    apiCategory: "Mobiles",
  },
  {
    id: "3",
    title: "Appliances",
    image: require("../../assets/images/applience.png"),
    apiCategory: "Appliances",
  },
  {
    id: "4",
    title: "Tech",
    image: require("../../assets/images/tech.png"),
    apiCategory: "Tech",
  },
  {
    id: "5",
    title: "Fashion",
    image: require("../../assets/images/fashion.png"),
    apiCategory: "Fashion",
  },
  {
    id: "6",
    title: "Groceries",
    image: require("../../assets/images/groceries.png"),
    apiCategory: "Groceries",
  },
  {
    id: "7",
    title: "Beauty",
    image: require("../../assets/images/beauty.png"),
    apiCategory: "Beauty",
  },
];

export default function CategoriesScreen() {
  
useEffect(() => {
  console.log("CategoriesHomeScreen");
}, []);

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Categories</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("ProductList", {
                category: item.apiCategory,
                title: item.title,
              })
            }
          >
          <Image
  source={item.image}
  style={styles.image}
  resizeMode="cover"
/>

<Text style={styles.categoryName}>
  {item.title}
</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FCFC",
  },

  titleContainer: {
    backgroundColor: "#EEF6F7",
    paddingVertical: 12,
    paddingHorizontal: 18,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#4D6F75",
  },

  list: {
    padding: 12,
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },

  card: {
    width: "48%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 190,
  },
categoryName: {
  fontSize: 17,
  fontWeight: "600",
  color: "#2F4F4F",
  textAlign: "center",
  paddingVertical: 10,
  backgroundColor: "#F4F8F8",
  borderTopWidth: 1,
  borderTopColor: "#E5E5E5",
},
});