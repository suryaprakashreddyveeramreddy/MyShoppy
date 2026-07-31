import React, { useEffect, useState } from "react";
import {View,Text,StyleSheet,FlatList,TextInput,ActivityIndicator,SafeAreaView,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "../types/navigation";
import ProductCard from "../components/ProductCard";
import AppHeader from "../components/AppHeader";


type Props = NativeStackScreenProps<
  CategoriesStackParamList,
  "ProductList"
>;

export default function ProductListScreen({
  
  navigation,
}: Props) {
  const route = useRoute<any>();

  const { category, title } = route.params;

  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

 

  const fetchProducts = async () => {
  try {
    const url = `http://localhost:3000/products?category=${category}`;
    console.log("URL:", url);

    const response = await fetch(url);
    console.log("Status:", response.status);

    const data = await response.json();
    console.log("Category:", category);
    console.log("Products:", data);

    setProducts(data);
  } catch (error) {
    console.log("Error fetching products:", error);
  } finally {
    setLoading(false);
  }
};

  const filteredProducts = products.filter((item) =>
    
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
  console.log(" ProductListScreen");
  fetchProducts();
}, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4D6F75" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.titleBar}>
        <Text style={styles.heading}>
          Categories / {title}
        </Text>
      </View>

      <View style={styles.subTitleContainer}>
        <Text style={styles.subtitle}>
          {title} For You!
        </Text>
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
          placeholder={`Search ${title}...`}
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() =>
              navigation.navigate("ProductDetails", {
                productId: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No products found.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FCFC",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleBar: {
    backgroundColor: "#EEF5F6",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4D6F75",
  },

  subTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#222",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D8E2E5",
    elevation: 2,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#222",
  },

  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#777",
  },
});