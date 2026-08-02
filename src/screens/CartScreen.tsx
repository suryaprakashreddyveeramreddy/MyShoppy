import React from "react";
import {SafeAreaView,View,Text,StyleSheet,FlatList,Image,TouchableOpacity,Alert,Platform} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import AppHeader from "../components/AppHeader";
import { useEffect } from "react";
import { Colors } from "../constants/colors";


export default function CartScreen() {
  useEffect(() => {
  console.log("CartScreen");
}, []);
  const navigation = useNavigation<any>();

  const {cart,increaseQuantity,decreaseQuantity,removeFromCart,getTotal,
  } = useCart();
  const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
 
const handleDecrease = (item: any) => {
  if (item.quantity === 1) {
    if (Platform.OS === "web") {
      const confirmRemove = window.confirm(
        "This item will be removed from your cart. Continue?"
      );

      if (confirmRemove) {
        try {
          removeFromCart(item.id);
        } catch (error) {
          console.error("Error removing product:", error);
        }
      }
    } else {
      Alert.alert(
        "Remove from Cart",
        "This item will be removed from your cart.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove",
            style: "destructive",
            onPress: () => {
              try {
                removeFromCart(item.id);
              } catch (error) {
                console.error("Error removing product:", error);
              }
            },
          },
        ]
      );
    }
  } else {
    try {
      decreaseQuantity(item.id);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  }
};

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={80} color="#4D6F75" />
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Add some products to continue shopping.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

<View style={styles.titleBar}>
  <Text style={styles.heading}>
    My Cart
  </Text>
</View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
  padding: 12,
  paddingBottom: 150,
}}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
  source={{ uri: item.image }}
  style={styles.image}
  resizeMode="contain"
/>

            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.price}>
                ${item.price}
              </Text>

              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.iconButton}
                  onPress={() => handleDecrease(item)}
                >
                  <Ionicons
                    name="remove"
                    size={18}
                    color="#fff"
                  />
                </TouchableOpacity>

                <Text style={styles.quantity}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
  style={styles.iconButton}
  onPress={() => {
    try {
      increaseQuantity(item.id);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  }}
>
                  <Ionicons
                    name="add"
                    size={18}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
  onPress={() => {
    try {
      removeFromCart(item.id);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  }}
>
              <Ionicons
                name="trash"
                size={24}
                color="red"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.bottomContainer}>
  <Text style={styles.summaryTitle}>
    Order Summary
  </Text>

  {cart.map((item) => (
    <View key={item.id} style={styles.summaryRow}>
      <Text style={styles.summaryItem} numberOfLines={1}>
        {item.title}
      </Text>

      <Text style={styles.summaryQty}>
        x{item.quantity}
      </Text>

      <Text style={styles.summaryPrice}>
        ₹{(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  ))}

  <View style={styles.divider} />

  <View style={styles.summaryRow}>
    <Text style={styles.totalLabel}>
      Total
    </Text>

    <Text style={styles.totalPrice}>
      ₹{total.toFixed(2)}
    </Text>
  </View>

  <TouchableOpacity
    style={styles.checkoutButton}
    onPress={() => navigation.navigate("Checkout")}
  >
    <Text style={styles.checkoutText}>
      Proceed to Checkout
    </Text>
  </TouchableOpacity>
</View>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },

  titleBar: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    elevation: 3,
    alignItems: "center",
  },

  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },

  price: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: "bold",
    marginVertical: 6,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  iconButton: {
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  quantity: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    color: Colors.text,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 18,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  totalLabel: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },

  checkoutButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  checkoutText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 17,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  emptyTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginTop: 20,
  },

  emptySubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: Colors.gray,
    fontSize: 16,
  },summaryTitle: {
  fontSize: 20,
  fontWeight: "700",
  marginBottom: 15,
  color: Colors.text,
},

summaryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},

summaryItem: {
  flex: 2,
  fontSize: 15,
  color: Colors.text,
},

summaryQty: {
  flex: 0.5,
  textAlign: "center",
  fontSize: 15,
  color: Colors.gray,
},

summaryPrice: {
  flex: 1,
  textAlign: "right",
  fontSize: 15,
  fontWeight: "600",
  color: Colors.text,
},

divider: {
  height: 1,
  backgroundColor: Colors.border,
  marginVertical: 12,
},
});