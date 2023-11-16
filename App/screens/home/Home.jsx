import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainCarousel />
        <ShoppingList />
        <Subscribe />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default Home;
