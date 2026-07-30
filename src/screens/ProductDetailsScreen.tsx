import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../types/navigation";
import { useCart } from "../context/CartContext";
import AppHeader from "../components/AppHeader";

type ProductDetailsRouteProp = RouteProp<
  RootStackParamList,
  "ProductDetails"
>;

export default function ProductDetailsScreen({ navigation }: any) {
  const route = useRoute<ProductDetailsRouteProp>();

  const { productId } = route.params;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );

      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
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
          source={{ uri: product.thumbnail }}
          style={styles.image}
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
            onPress={() => addToCart(product)}
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

  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4D6F75",
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
    color: "#222",
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
  },

  stock: {
    marginLeft: 10,
    color: "#888",
    fontSize: 14,
  },

  price: {
    fontSize: 30,
    color: "#4D6F75",
    fontWeight: "bold",
    marginTop: 15,
  },

  descriptionTitle: {
    marginTop: 25,
    fontSize: 18,
    fontWeight: "700",
    color: "#222",
  },

  description: {
    marginTop: 10,
    color: "#666",
    lineHeight: 24,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#4D6F75",
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
});