import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartButton from "../components/CartButton";
import { SafeAreaView } from "react-native-safe-area-context";

const fetchBilling = async (cart) => {
  await new Promise((res) => setTimeout(res, 300));
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { total, itemCount: cart.length };
};

const Cart = () => {
  const cartState = useSelector((state) => state.cart.products || []);
  const dispatch = useDispatch();
  const [billing, setBilling] = useState({ total: 0, itemCount: 0 });

  const updateBilling = useCallback(async (cartData) => {
    const bill = await fetchBilling(cartData);
    setBilling(bill);
  }, []);

  useEffect(() => {
    updateBilling(cartState);
  }, [cartState, updateBilling]);

  const handleClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to clear your cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: () => dispatch({ type: "CLEAR_CART" }),
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {item.image?.length > 0 && (
        <Image
          source={{
            uri: `https://image.aapkabazar.co/product/${item.id}/${item.image[0]}?type=png`,
          }}
          style={styles.image}
        />
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>Price: ₹{item.price.toFixed(2)}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
        <Text style={styles.itemTotal}>
          Total: ₹{(item.price * item.quantity).toFixed(2)}
        </Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <CartButton product={item} />
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }} />
        </View>
      </View>
    </View>
  );

  if (cartState.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubtext}>
          Add some products to get started!
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Cart</Text>
        <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartState}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={{ maxHeight: Dimensions.get("screen").height * 0.6 }}
        scrollEnabled
        contentContainerStyle={{
          paddingBottom: 16,
        }}
      />
      <View style={styles.billingContainer}>
        <Text style={styles.billingHeading}>Billing Summary</Text>
        <View style={styles.billingRow}>
          <Text style={styles.billingLabel}>Total Items:</Text>
          <Text style={styles.billingValue}>{billing.itemCount}</Text>
        </View>
        <View style={styles.billingRow}>
          <Text style={styles.billingLabel}>Total Price:</Text>
          <Text style={styles.totalPrice}>₹{billing.total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#999",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fafafa",
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: "bold",
    marginBottom: 4,
    fontSize: 16,
  },
  itemPrice: {
    color: "#666",
    marginBottom: 2,
  },
  itemQuantity: {
    color: "#666",
    marginBottom: 2,
  },
  itemTotal: {
    color: "#00b386",
    fontWeight: "bold",
    marginBottom: 8,
  },
  billingContainer: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  billingHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  billingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  billingLabel: {
    fontSize: 16,
    color: "#666",
  },
  billingValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00b386",
  },
  checkoutButton: {
    backgroundColor: "#00b386",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cart;
