import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";
import { Colors } from "../constants/colors";


export default function CheckoutScreen() {
  useEffect(() => {
  console.log("OrderSuccessScreen");
}, []);
  const navigation = useNavigation<any>();

  const { getTotal, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const [successModal, setSuccessModal] = useState(false);

  const validate = () => {
    if (!fullName.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter a valid 10-digit mobile number.");
      return false;
    }

    if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      alert("Enter a valid email.");
      return false;
    }

    if (!address.trim()) {
      alert("Please enter your address.");
      return false;
    }

    if (!city.trim()) {
      alert("Please enter your city.");
      return false;
    }

    if (!state.trim()) {
      alert("Please enter your state.");
      return false;
    }

    if (!/^[0-9]{6}$/.test(pincode)) {
      alert("Enter a valid 6-digit pincode.");
      return false;
    }

    return true;
  };

  const placeOrder = () => {
  if (!validate()) return;

  try {
    clearCart();
    setSuccessModal(true);
  } catch (error) {
    console.error("Error placing order:", error);
  }
};

  const PaymentOption = ({
    title,
  }: {
    title: string;
  }) => (
    <TouchableOpacity
      style={styles.paymentRow}
     onPress={() => {
  try {
    setPaymentMethod(title);
  } catch (error) {
    console.error("Payment selection error:", error);
  }
}}
    >
      <Ionicons
        name={
          paymentMethod === title
            ? "radio-button-on"
            : "radio-button-off"
        }
        size={22}
        color="#4D6F75"
      />

      <Text style={styles.paymentText}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>
          Checkout
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="number-pad"
          maxLength={10}
          value={mobile}
          onChangeText={setMobile}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, { height: 90 }]}
          placeholder="Address"
          multiline
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <TextInput
          style={styles.input}
          placeholder="State"
          value={state}
          onChangeText={setState}
        />

        <TextInput
          style={styles.input}
          placeholder="Pincode"
          keyboardType="number-pad"
          maxLength={6}
          value={pincode}
          onChangeText={setPincode}
        />

        <Text style={styles.sectionTitle}>
          Payment Method
        </Text>

        <PaymentOption title="Cash on Delivery" />
        <PaymentOption title="UPI" />
        <PaymentOption title="Credit / Debit Card" />

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>
            Total Amount
          </Text>

          <Text style={styles.totalPrice}>
            ${getTotal().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={placeOrder}
        >
          <Text style={styles.buttonText}>
            Place Order
          </Text>
        </TouchableOpacity>
              </ScrollView>

      {/* Success Modal */}
      <Modal
        visible={successModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons
              name="checkmark-circle"
              size={100}
              color="#4CAF50"
            />

            <Text style={styles.successTitle}>
              Order Placed!
            </Text>

            <Text style={styles.successMessage}>
              Your order has been placed successfully.
            </Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
  try {
    setSuccessModal(false);
    navigation.popToTop();
  } catch (error) {
    console.error("Navigation Error:", error);
  }
}}
            >
              <Text style={styles.successButtonText}>
                Continue Shopping
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },

  input: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    height: 55,
    color: Colors.text,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 12,
    color: Colors.text,
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  paymentText: {
    marginLeft: 10,
    fontSize: 17,
    color: Colors.text,
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 20,
  },

  totalLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.primary,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 30,
  },

  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "700",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "85%",
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    elevation: 10,
  },

  successTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 15,
  },

  successMessage: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 30,
  },

  successButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 35,
    paddingVertical: 14,
    borderRadius: 12,
  },

  successButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
});