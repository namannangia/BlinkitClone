import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartButton from "../components/CartButton";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = route.params;
  const navigation = useNavigation();
  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://devfrontendapi.aapkabazar.co/api/product?productId=${productId}&cityId=619f219d26d9ad0f34102dd2`
      );
      if (response.data?.success) setProduct(response.data.product);

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text>Failed to load product details</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#000"} />
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 16,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Text
            onPress={() => navigation?.goBack?.()}
            style={{
              fontSize: 28,
              marginRight: 12,
              color: "#333",
            }}
          >
            {"←"}
          </Text>
          <Text
            style={{
              fontSize: 22,
              textTransform: "capitalize",
              fontWeight: "bold",
            }}
          >
            {product.name}
          </Text>
        </View>
        {product.images && (
          <Image
            source={{
              uri: `https://image.aapkabazar.co/product/${product.id}/${product.images[0]}?type=png`,
            }}
            style={styles.productImage}
            resizeMode="contain"
          />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.price}>₹{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ width: 120 }}>
            <CartButton
              product={{
                name: product.name,
                id: product.id,
                price: product.minSellPrice,
                image: product.images,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  productImage: { width: "100%", height: 300 },
  detailsContainer: { padding: 16 },
  productName: {
    textTransform: "capitalize",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: { fontSize: 20, color: "#2ecc71", marginBottom: 16 },
  description: { fontSize: 16, color: "#666", lineHeight: 24 },
});

export default ProductDetails;
