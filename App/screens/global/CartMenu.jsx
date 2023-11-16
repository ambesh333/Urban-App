import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import CloseIcon from "@expo/vector-icons/MaterialCommunityIcons";
import AddIcon from "@expo/vector-icons/MaterialCommunityIcons";
import RemoveIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  removeFromCart,
  setIsCartOpen,
  decreaseCount,
  increaseCount,
} from "../../state";
import { shades } from "../../theme";

const CartMenu = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <View
      style={{
        display: isCartOpen ? "flex" : "none",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "fixed",
        zIndex: 10,
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        overflow: "auto",
      }}
    >
      <View
        style={{
          position: "fixed",
          right: 0,
          bottom: 0,
          width: "max(400px, 30%)",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View style={{ padding: 20, overflow: "auto", height: "100%" }}>
          {/* HEADER */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 15,
              alignItems: "center", // Align items to center vertically
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              SHOPPING BAG ({cart.length})
            </Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => dispatch(setIsCartOpen())}
              style={{ marginLeft: "auto" }}
              alignItems="center"
            />
          </View>

          {/* CART LIST */}
          <View>
            {cart.map((item) => (
              <View key={`${item.attributes.name}-${item.id}`}>
                <View style={{ flexDirection: "row", padding: "15px 0" }}>
                  <View style={{ flex: 1, marginRight: 15, padding: 5 }}>
                    <Image
                      source={{
                        uri: `http://192.168.1.2:1337${item.attributes.image.data.attributes.formats.medium.url}`,
                      }}
                      style={{ width: 123, height: 164 }}
                    />
                  </View>
                  <View style={{ flex: 2 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                        {item.attributes.name}
                      </Text>
                      <IconButton
                        icon="close"
                        size={24}
                        onPress={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      />
                    </View>
                    <View style={{ paddingBottom: 10 }}>
                      <Text>{item.attributes.shortDescription}</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        margin: "15px 0",
                        paddingLeft: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          borderWidth: 1.0,
                          borderColor: shades.neutral[500],
                          borderRadius: 5,
                          overflow: "hidden",
                        }}
                      >
                        <IconButton
                          icon="minus"
                          size={15} // Adjust the size of the icon
                          onPress={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        />
                        <Text style={{ paddingHorizontal: 10 }}>
                          {item.count}
                        </Text>
                        <IconButton
                          icon="plus"
                          size={15} // Adjust the size of the icon
                          onPress={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        />
                      </View>
                      <Text style={{ fontWeight: "bold", marginLeft: "auto" }}>
                        ${item.attributes.price}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: shades.neutral[200],
                    paddingBottom: 10,
                  }}
                />
              </View>
            ))}
          </View>

          {/* ACTIONS */}
          <View style={{ margin: "20px 0" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>SUBTOTAL</Text>
              <Text style={{ fontWeight: "bold" }}>${totalPrice}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("checkout");
                dispatch(setIsCartOpen());
              }}
              style={{
                backgroundColor: shades.primary[400],
                borderRadius: 0,
                minWidth: "100%",
                minHeight: 40,
                padding: "20px 40px",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                CHECKOUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartMenu;
