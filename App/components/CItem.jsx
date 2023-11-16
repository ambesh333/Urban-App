import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import React from "react";

const CarouselItem = ({ item }) => {
  const translateYImage = new Animated.Value(40);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={item.img}
        resizeMode="contain"
        style={[
          styles.image,
          {
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    width: 400,
    height: 250,
    alignItems: "center",
  },
  image: {
    flex: 0.9,
    width: "100%",
  },
});
