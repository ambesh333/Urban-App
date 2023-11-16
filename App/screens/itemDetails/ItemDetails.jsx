import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../state";
import { shades } from "../../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import Item from "../../components/item";
import { IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { itemId } = route.params;
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  // Fetch item and items data based on the itemId
  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.2:1337/api/items/${itemId}?populate=image`
        );
        const itemJson = await response.json();
        setItem(itemJson.data);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    const fetchRelatedItems = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.2:1337/api/items?populate=image`
        );
        const itemsJson = await response.json();
        setItems(itemsJson.data);
      } catch (error) {
        console.error("Error fetching related items:", error);
      }
    };

    fetchItemDetails();
    fetchRelatedItems();
  }, [itemId]);

  return (
    <ScrollView>
      <View>
        {/* IMAGES */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ItemDetails", { itemId: item.id })
          }
        >
          <Image
            source={{
              uri: `http://192.168.1.2:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`,
            }}
            style={{ width: 350, height: 300, objectFit: "cover", margin: 20 }}
          />
        </TouchableOpacity>

        {/* ACTIONS */}
        <View>
          <View style={{ margin: 20 }}>
            <View style={{ paddingHorizontal: 10 }}>
              <Text style={{ fontWeight: "bold" }}>
                {item?.attributes?.name}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                ${item?.attributes?.price}
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text>{item?.attributes?.longDescription}</Text>
            </View>
          </View>

          {/* Add to Cart section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <IconButton
                icon="minus"
                onPress={() => setCount(Math.max(count - 1, 0))}
                style={{ backgroundColor: "#DDDDDD", paddingHorizontal: 10 }}
              />
              <Text style={{ marginHorizontal: 10, fontSize: 16 }}>
                {count}
              </Text>
              <IconButton
                icon="plus"
                onPress={() => setCount(count + 1)}
                style={{ backgroundColor: "#DDDDDD", paddingHorizontal: 10 }}
              />
            </View>
            <View style={{ paddingLeft: 10, marginLeft: 10 }}>
              <Button
                title="ADD To Chart"
                onPress={() =>
                  dispatch(addToCart({ item: { ...item, count } }))
                }
                size={30}
                color="black"
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", padding: 10 }}>
            <TouchableOpacity>
              <Text style={{ paddingHorizontal: 20 }}>ADD TO WISHLIST</Text>
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 20 }}>
              CATEGORIES: {item?.attributes?.category}
            </Text>
          </View>
        </View>
      </View>

      {/* RELATED ITEMS */}
      <View>
        <Text style={{ fontWeight: "bold", padding: 10, fontSize: 20 }}>
          Related Products
        </Text>
        <View
          style={{ flexDirection: "row", paddingHorizontal: 10, marging: 10 }}
        >
          <ScrollView horizontal>
            {items.slice(0, 4).map((relatedItem, i) => (
              <TouchableOpacity
                key={`${relatedItem.name}-${i}`}
                onPress={() =>
                  navigation.navigate("ItemDetails", { itemId: relatedItem.id })
                }
              >
                <View style={{ padding: 20 }}>
                  <Item item={relatedItem} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default ItemDetails;
