import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const CartButton = ({ product }) => {
  if (!product || !product.id) {
    console.warn("CartButton: Invalid product prop", product);
    return null;
  }

  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart.products || []);
  const cartItem = cartState.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const incrementQuantity = () => {
    try {
      dispatch({ type: "INCREMENT_QUANTITY", payload: { id: product.id } });
    } catch (error) {
      console.error("Error incrementing quantity:", error);
    }
  };

  const decrementQuantity = () => {
    try {
      dispatch({ type: "DECREMENT_QUANTITY", payload: { id: product.id } });
    } catch (error) {
      console.error("Error decrementing quantity:", error);
    }
  };

  const addToCart = () => {
    try {
      dispatch({ type: "ADD_TO_CART", payload: { product } });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (quantity === 0) {
    return (
      <TouchableOpacity onPress={addToCart} style={styles.addButton}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={decrementQuantity}
        style={styles.quantityButton}
      >
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityDisplay}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
      <TouchableOpacity
        onPress={incrementQuantity}
        style={styles.quantityButton}
      >
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#00b386",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#00b386",
  },
  quantityButton: {
    backgroundColor: "#00b386",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  quantityButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
  quantityDisplay: {
    minWidth: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
