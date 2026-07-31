import React from "react";
import {SafeAreaView,View,Text,StyleSheet,FlatList,Image,TouchableOpacity,Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import AppHeader from "../components/AppHeader";
import { useEffect } from "react";


export default function CartScreen() {
  useEffect(() => {
  console.log("CartScreen");
}, []);
  const navigation = useNavigation<any>();

  const {cart,increaseQuantity,decreaseQuantity,removeFromCart,getTotal,
  } = useCart();
  const handleDecrease = (item: any) => {
  if (item.quantity === 1) {
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
          onPress: () => removeFromCart(item.id),
        },
      ]
    );
  } else {
    decreaseQuantity(item.id);
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
              source={{ uri: item.thumbnail }}
              style={styles.image}
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
                  onPress={() => increaseQuantity(item.id)}
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
              onPress={() => removeFromCart(item.id)}
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
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            ${getTotal().toFixed(2)}
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
  backgroundColor: "#F8FCFC",

  },

   heading: {
  fontSize: 28,
  fontWeight: "700",
  color: "#4D6F75"
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
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
    color: "#333",
  },

  price: {
    fontSize: 18,
    color: "#4D6F75",
    fontWeight: "bold",
    marginVertical: 6,
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  iconButton: {
    backgroundColor: "#4D6F75",
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
  },

  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
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
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4D6F75",
  },

  checkoutButton: {
    backgroundColor: "#4D6F75",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  titleBar: {
  backgroundColor: "#EEF5F6",
  paddingVertical: 12,
  paddingHorizontal: 16,
},
emptyTitle: {
  fontSize: 28,
  fontWeight: "700",
  color: "#4D6F75",
  marginTop: 20,
},

  emptySubtitle: {
  marginTop: 10,
  textAlign: "center",
  color: "#777",
  fontSize: 16,
}
});