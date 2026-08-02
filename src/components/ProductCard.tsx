import React from "react";
import {View,Text,Image,StyleSheet,TouchableOpacity,Alert,Platform} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { Product } from "../types/product";
import { Colors } from "../constants/colors";

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

function ProductCard({
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
          color={Colors.gray}
        />
      </TouchableOpacity>

    <Image
  source={{ uri: product.image }}
  style={styles.image}
  resizeMode="contain"
/>
{product.stock === 0 && (
  <View style={styles.outOfStockBadge}>
    <Text style={styles.outOfStockText}>
      Out of Stock
    </Text>
  </View>
)}

      {/* Product Title */}
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>

      {/* Rating */}
      <View style={styles.ratingContainer}>
        <Ionicons
          name="star"
          size={15}
          color={Colors.warning}
        />

       <Text style={styles.rating}>
  {Number(product.rating.rate).toFixed(1)}
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
  onPress={() => {
try {
  addToCart(product);

  if (Platform.OS === "web") {
    window.alert(`${product.title} has been added to your cart.`);
  } else {
    Alert.alert(
      "Added to Cart",
      `${product.title} has been added to your cart.`
    );
  }
} catch (error) {
  console.error("Add To Cart Error:", error);

  if (Platform.OS === "web") {
    window.alert("Unable to add item to cart.");
  } else {
    Alert.alert("Error", "Unable to add item to cart.");
  }
}
  }}
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
  backgroundColor: Colors.white,
  borderRadius: 15,
  padding: 10,
  marginBottom: 15,
  elevation: 4,
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
    color: Colors.text,
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
    color: Colors.gray,
  },

  stock: {
    marginLeft: 8,
    color: Colors.lightGray,
    fontSize: 12,
  },

  description: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 8,
    minHeight: 34,
  },

  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.white,
    fontWeight: "700",
    fontSize: 14,
  },
  outOfStockBadge: {
  position: "absolute",
  top: 10,
  left: 10,
  backgroundColor: "#E53935",
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 8,
},

outOfStockText: {
  color: "#fff",
  fontWeight: "bold",
  fontSize: 12,
},
});
export default React.memo(ProductCard);