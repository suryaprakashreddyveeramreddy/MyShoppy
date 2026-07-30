import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: any;
  onPress: () => void;
}

export default function ProductCard({
  product,
  onPress,
}: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Favorite Icon */}
      <TouchableOpacity style={styles.favorite}>
        <Ionicons
          name="heart-outline"
          size={22}
          color="#666"
        />
      </TouchableOpacity>

      {/* Product Image */}
      <Image
        source={{ uri: product.thumbnail }}
        style={styles.image}
      />

      {/* Product Title */}
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Ionicons
          name="star"
          size={15}
          color="#FFD700"
        />

        <Text style={styles.rating}>
          {Number(product.rating).toFixed(1)}
        </Text>

        <Text style={styles.stock}>
          ({product.stock} left)
        </Text>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {product.description}
      </Text>

      {/* Price */}
      <Text style={styles.price}>
        ${product.price}
      </Text>

      {/* Add To Cart Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => addToCart(product)}
      >
        <Text style={styles.buttonText}>
          Add To Cart
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  favorite: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 100,
  },

  image: {
    width: "100%",
    height: 140,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  rating: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
  },

  stock: {
    marginLeft: 8,
    color: "#888",
    fontSize: 12,
  },

  description: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    minHeight: 34,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4D6F75",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#4D6F75",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});