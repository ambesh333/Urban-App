import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { setIsCartOpen } from "../../state";
import { shades } from "../../theme";

const Navbar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const statusBarHeight = StatusBar.currentHeight || 0;
  console.log(cart.length);

  return (
    <View
      style={{
        paddingTop: statusBarHeight,
        backgroundColor: shades.neutral[100],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text
            style={{
              color: shades.secondary[500],
              fontSize: 18,
            }}
          >
            URBAN
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <TouchableOpacity style={{ color: "black" }}>
            <Ionicons name="ios-search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{ color: "black" }}>
            <Ionicons name="ios-person-outline" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dispatch(setIsCartOpen())}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Ionicons name="ios-cart-outline" size={24} color="black" />
            <Badge
              value={cart.length}
              status="error"
              containerStyle={{ position: "relative", top: -10, left: -3 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ color: "black" }}>
            <Ionicons name="ios-menu" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Navbar;
