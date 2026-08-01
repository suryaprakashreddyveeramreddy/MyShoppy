import React, {useEffect,useState,useCallback,useMemo,} from "react";
import {View,Text,StyleSheet,FlatList,TextInput,ActivityIndicator,SafeAreaView,TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CategoriesStackParamList } from "../types/navigation";
import ProductCard from "../components/ProductCard";
import AppHeader from "../components/AppHeader";
import { Product } from "../types/product";
import { getProducts } from "../services/productService";
import { Colors } from "../constants/colors";
import { Picker } from "@react-native-picker/picker";


type Props = NativeStackScreenProps<
  CategoriesStackParamList,
  "ProductList"
>;

export default function ProductListScreen({
  
  navigation,
}: Props) {
const route = useRoute<Props["route"]>();
const { category, title } = route.params;
const [products, setProducts] = useState<Product[]>([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [sortBy, setSortBy] = useState("default");
const [priceRange, setPriceRange] = useState("all");
 

 const fetchProducts = async () => {
  try {
    setLoading(true);
    setError("");

    const data = await getProducts(category);

    console.log("Category:", category);
    console.log("Products:", data);

    setProducts(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    setError("Unable to load products.");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchProducts();
}, [category]);
const openProduct = useCallback(
  (id: number) => {
    navigation.navigate("ProductDetails", {
      productId: id,
    });
  },
  [navigation]
);
  const filteredProducts = useMemo(() => {
  let filtered = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  // Price Filter
  if (priceRange === "0-50") {
    filtered = filtered.filter((item) => item.price <= 50);
  } else if (priceRange === "50-100") {
    filtered = filtered.filter(
      (item) => item.price > 50 && item.price <= 100
    );
  } else if (priceRange === "100+") {
    filtered = filtered.filter((item) => item.price > 100);
  }

  // Sorting
  switch (sortBy) {
    case "lowHigh":
      filtered.sort((a, b) => a.price - b.price);
      break;

    case "highLow":
      filtered.sort((a, b) => b.price - a.price);
      break;

    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;

    case "az":
      filtered.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      break;
  }

  return filtered;
}, [products, search, sortBy, priceRange]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
  size="large"
  color={Colors.primary}
/>
      </View>
    );
  }
  if (error) {
  return (
    <View style={styles.loader}>
      <Text style={styles.errorText}>{error}</Text>

      <TouchableOpacity
        style={styles.retryButton}
        onPress={fetchProducts}
      >
        <Text style={styles.retryText}>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
}

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <View style={styles.titleBar}>
  <View style={styles.breadcrumbContainer}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
  <Text style={styles.currentCategory}>
        Categories
      </Text>
    </TouchableOpacity>

    <Text
      style={{
        fontSize: 28,
        fontWeight: "700",
        color: "#4D6F75",
      }}
    >
      {" / "}
      {title}
    </Text>
  </View>
</View>

      <View style={styles.subTitleContainer}>
        <Text style={styles.subtitle}>
          {title} For You!
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
         color={Colors.gray}
          style={styles.searchIcon}
        />


        <TextInput
          style={styles.searchInput}
          placeholder={`Search ${title}...`}
          placeholderTextColor={Colors.lightGray}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <View style={styles.filterRow}>
  <View style={styles.filterBox}>
    <Picker
      selectedValue={sortBy}
      onValueChange={setSortBy}
    >
      <Picker.Item label="Sort" value="default" />
      <Picker.Item label="Price ↑" value="lowHigh" />
      <Picker.Item label="Price ↓" value="highLow" />
      <Picker.Item label="Rating" value="rating" />
      <Picker.Item label="A-Z" value="az" />
    </Picker>
  </View>

  <View style={styles.filterBox}>
    <Picker
      selectedValue={priceRange}
      onValueChange={setPriceRange}
    >
      <Picker.Item label="All Prices" value="all" />
      <Picker.Item label="$0 - $50" value="0-50" />
      <Picker.Item label="$50 - $100" value="50-100" />
      <Picker.Item label="$100+" value="100+" />
    </Picker>
  </View>
</View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard
  product={item}
  onPress={() => openProduct(item.id)}
/>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No products found.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  titleBar: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
  },

  subTitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 2,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: Colors.text,
  },

  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  row: {
    justifyContent: "space-between",
    marginBottom: 10,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: Colors.gray,
  },
  errorText: {
  color: Colors.danger,
  fontSize: 17,
  textAlign: "center",
  marginBottom: 20,
},

retryButton: {
  backgroundColor: Colors.primary,
  paddingHorizontal: 25,
  paddingVertical: 12,
  borderRadius: 8,
},

retryText: {
  color: Colors.white,
  fontWeight: "700",
  fontSize: 16,
},

breadcrumbContainer: {
  flexDirection: "row",
  alignItems: "center",
},

breadcrumb: {
  fontSize: 28,
  fontWeight: "700",
  color: Colors.primary,
},

currentCategory: {
  fontSize: 28,
  fontWeight: "700",
  color: Colors.primary,
},
filterRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginHorizontal: 16,
  marginBottom: 15,
},

filterBox: {
  flex: 1,
  backgroundColor: Colors.white,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: Colors.border,
  marginHorizontal: 4,
},
});