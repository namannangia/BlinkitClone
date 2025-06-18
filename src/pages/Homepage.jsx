import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CartButton from "../components/CartButton";

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: product.id })
      }
    >
      <Image
        source={{
          uri: `https://image.aapkabazar.co/product/${product.id}/${product.image[0]}?type=png`,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.price}>Rs {product.price.toFixed(2)}</Text>
      <CartButton product={product} />
    </TouchableOpacity>
  );
};

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartState = useSelector((state) => state.cart.products || []);
  const fetchProducts = async () => {
    try {
      setProducts([]);
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://devfrontendapi.aapkabazar.co/api/autocomplete?cityId=619f219d26d9ad0f34102dd2&keyword=rice`
      );

      if (response.data.success && response.data.products) {
        const formattedProds = response.data.products.map((item) => {
          const { id, name, minSellPrice } = item;
          return {
            id,
            name,
            price: minSellPrice,
            image: item.images || [],
          };
        });

        setProducts(formattedProds);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchProducts();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#00b386" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Loading</Text>
          <Text style={styles.headerSubtitle}>
            Your favorite groceries delivered fast!
          </Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#00b386" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#00b386" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Error</Text>
          <Text style={styles.headerSubtitle}>
            Your favorite groceries delivered fast!
          </Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              setError(null);
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#00b386" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>BlinkIt</Text>
        <Text style={styles.headerSubtitle}>
          Your favorite groceries delivered fast!
        </Text>
      </View>
      <View style={styles.main}>
        <Text style={styles.sectionTitle}>
          Featured Products ({products.length})
        </Text>
        {products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try refreshing the page</Text>
          </View>
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ProductCard product={item} />}
            horizontal={false}
            numColumns={2}
            contentContainerStyle={styles.productsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          &copy; {new Date().getFullYear()} BlinkitClone. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  header: { backgroundColor: "#00b386", padding: 24, alignItems: "center" },
  headerTitle: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  headerSubtitle: { color: "#fff", fontSize: 16, marginTop: 8 },
  main: { flex: 1, padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  productsList: { paddingBottom: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#00b386",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: "center",
    flex: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f0f0f0",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "capitalize",
    textAlign: "center",
  },
  price: { color: "#00b386", fontWeight: "bold", marginBottom: 8 },
  footer: { backgroundColor: "#eee", padding: 12, alignItems: "center" },
  footerText: { color: "#555", fontSize: 13 },
});
