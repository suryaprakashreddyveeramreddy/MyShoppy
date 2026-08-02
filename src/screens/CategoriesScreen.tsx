import React from "react";
import {SafeAreaView,View,Text,StyleSheet,FlatList,TouchableOpacity,Image,TextInput} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
import { useEffect,useState } from "react";
import { Colors } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";



const categories = [
  {
    id: "1",
    title: "Furniture",
    image: require("../../assets/images/furniture.png"),
    apiCategory: "Furniture",
  },
  {
    id: "2",
    title: "Electronics",
    image: require("../../assets/images/electronics.png"),
    apiCategory: "Electronics",
  },
  {
    id: "3",
    title: "Home & Kitchen",
    image: require("../../assets/images/homekitchen.png"),
    apiCategory: "Home & Kitchen",
  },
  {
    id: "4",
    title: "Women",
    image: require("../../assets/images/women.png"),
    apiCategory: "Women",
  },
  {
    id: "5",
    title: "Men",
    image: require("../../assets/images/fashion.png"),
    apiCategory: "Men",
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
const [search, setSearch] = useState("");
const filteredCategories = categories.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase())
);

  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.titleContainer}>
        <Text style={styles.heading}>Categories</Text>
      </View>
      <View style={styles.searchContainer}>
  <Ionicons
    name="search"
    size={20}
    color="#777"
    style={styles.searchIcon}
  />

  <TextInput
    style={styles.searchInput}
    placeholder="Search Categories..."
    placeholderTextColor="#999"
    value={search}
    onChangeText={setSearch}
  />
</View>

      <FlatList
       data={filteredCategories}
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

<View style={styles.overlay}>
  <Text style={styles.categoryName}>
    {item.title}
  </Text>
</View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  titleContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.primary,
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
  height: 190,
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: Colors.white,
  elevation: 4,
  marginBottom: 15,
},

image: {
  width: "100%",
  height: "100%",
},

overlay: {
  position: "absolute",
  top: 15,
  left: 0,
  right: 0,
  alignItems: "center",
},

categoryName: {
  fontSize: 20,
  fontWeight: "900",
  color: "#FFFFFF",
  letterSpacing: 0.8,
  textShadowColor: "rgba(0,0,0,0.85)",
  textShadowOffset: {
    width: 2,
    height: 2,
  },
  textShadowRadius: 8,
},
searchContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: Colors.white,
  marginHorizontal: 15,
  marginVertical: 12,
  paddingHorizontal: 15,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#DDE6E8",
  elevation: 3,
},

searchIcon: {
  marginRight: 10,
},

searchInput: {
  flex: 1,
  height: 50,
  fontSize: 16,
  color: Colors.text,
},
});