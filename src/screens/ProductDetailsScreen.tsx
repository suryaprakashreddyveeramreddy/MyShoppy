import React, { useEffect, useState } from "react";
import {SafeAreaView,View,Text,StyleSheet,Image,TouchableOpacity,ScrollView,ActivityIndicator,Alert} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { CategoriesStackParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";
import AppHeader from "../components/AppHeader";
import { BASE_URL } from "../config/api";
import { Product } from "../types/product";
import { Colors } from "../constants/colors";


type ProductDetailsRouteProp = RouteProp<
  CategoriesStackParamList,
  "ProductDetails"
>;

export default function ProductDetailsScreen({ navigation }: any) {
  useEffect(() => {
    loadProduct();
  }, []);
  const route = useRoute<ProductDetailsRouteProp>();

  const { productId } = route.params;
  const { addToCart } = useCart();

const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  

const loadProduct = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${BASE_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

   const data = await response.json();
setProduct(data);
  } catch (error) {
    console.error("Error loading product:", error);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#4D6F75" />
    </View>
  );
}

if (!product) {
  return (
    <View style={styles.loader}>
      <Text>Product not found.</Text>
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.titleBar}>
        <Text style={styles.pageTitle}>Product Details</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back-circle"
            size={34}
            color="#4D6F75"
          />
        </TouchableOpacity>

       <Image
  source={{ uri: product.image }}
  style={styles.image}
  resizeMode="contain"
/>

        <View style={styles.content}>
          <Text style={styles.title}>
            {product.title}
          </Text>

          <View style={styles.ratingRow}>
            <Ionicons
              name="star"
              size={18}
              color="#FFD700"
            />
            <Text style={styles.rating}>
              {Number(product.rating).toFixed(1)}
            </Text>

            <Text style={styles.stock}>
              ({product.stock} left)
            </Text>
          </View>

          <Text style={styles.price}>
            ${product.price}
          </Text>

          <Text style={styles.descriptionTitle}>
            Description
          </Text>

          <Text style={styles.description}>
            {product.description}
          </Text>

          <TouchableOpacity
            style={styles.button}
           onPress={() => {
  try {
    addToCart(product);

    Alert.alert(
      "Success",
      "Item added to cart successfully!"
    );
  } catch (error) {
    Alert.alert(
      "Error",
      "Failed to add item to cart."
    );
    console.error(error);
  }
}}
          >
            <Text style={styles.buttonText}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleBar: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },

  backButton: {
    marginLeft: 15,
    marginTop: 15,
  },

  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 10,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  rating: {
    marginLeft: 5,
    fontWeight: "600",
    fontSize: 16,
    color: Colors.text,
  },

  stock: {
    marginLeft: 10,
    color: Colors.gray,
    fontSize: 14,
  },

  price: {
    fontSize: 30,
    color: Colors.primary,
    fontWeight: "bold",
    marginTop: 15,
  },

  descriptionTitle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  description: {
    marginTop: 10,
    color: Colors.gray,
    lineHeight: 24,
    fontSize: 15,
  },

  button: {
    backgroundColor: Colors.primary,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
});