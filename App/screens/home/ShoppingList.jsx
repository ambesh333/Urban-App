import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SIZES, COLORS } from "../../theme";
import { setItems } from "../../state";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../components/item";

const Types = ["ALL", "NEW ARRIVALS", "BEST SELLERS", "TOP RATED"];

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("ALL");
  const items = useSelector((state) => state.cart.items);

  async function getItems() {
    try {
      const response = await fetch(
        "http://192.168.1.2:1337/api/items?populate=image",
        { method: "GET" }
      );
      const itemsJson = await response.json();
      dispatch(setItems(itemsJson.data));
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  const renderItem = ({ item }) => (
    <Item item={item} key={`${item.name}-${item.id}`} />
  );

  const keyExtractor = (item) => `${item.id}`;

  return (
    <View>
      <View style={styles.Box}>
        <Text style={{ textAlign: "center" }}>Our Featured Products</Text>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={Types}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeTab, item)}
              onPress={() => setActiveTab(item)}
            >
              <Text style={styles.tabText(activeTab, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{
            flexDirection: "row",
            columnGap: SIZES.small,
          }}
          horizontal
        />
      </View>
      <FlatList
        data={
          activeTab === "ALL"
            ? items
            : items.filter((item) =>
                activeTab === "NEW ARRIVALS"
                  ? item.attributes.category === "newArrivals"
                  : activeTab === "BEST SELLERS"
                  ? item.attributes.category === "bestSellers"
                  : activeTab === "TOP RATED"
                  ? item.attributes.category === "topRated"
                  : false
              )
        }
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.itemList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Box: {
    width: "100%",
    marginTop: 10,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeType, item) => ({
    fontSize: SIZES.small,
    color: activeType === item ? COLORS.secondary : COLORS.gray2,
  }),
  itemList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.medium,
  },
});

export default ShoppingList;
