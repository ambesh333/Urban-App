import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { shades } from "../theme";

import { useNavigation } from "@react-navigation/native";

const Item = ({ item }) => {
  const navigation = useNavigation();

  const { category, price, name, image } = item.attributes;

  const {
    data: {
      attributes: {
        formats: {
          medium: { url },
        },
      },
    },
  } = image;

  const handlePress = () => {
    navigation.navigate("ItemDetails", { itemId: item.id });
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `http://192.168.1.2:1337${url}` }}
            style={styles.image}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.detailsContainer}>
        <Text style={styles.categoryText}>
          {category
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())}
        </Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.priceText}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 270,
    height: 320,
  },
  overlay: {
    position: "absolute",
    bottom: "10%",
    left: 0,
    width: "100%",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: shades.neutral[100],
    borderRadius: 3,
  },
  counter: {
    color: shades.primary[300],
    paddingHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: shades.primary[300],
    color: "white",
    marginTop: 10,
  },
  detailsContainer: {
    marginTop: 3,
  },
  categoryText: {
    fontSize: 14,
    color: shades.neutral.dark,
  },
  nameText: {
    fontSize: 16,
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Item;
