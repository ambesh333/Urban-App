import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log(`Subscribed with email: ${email}`);
  };

  return (
    <View
      style={{
        width: "100%",
        margin: 10,
        alignItems: "center",
      }}
    >
      <IconButton icon="email" size={40} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          alignItems: "center",
        }}
      >
        Subscribe To Our Newsletter
      </Text>
      <Text style={{ marginTop: 10, maxWidth: 300 }}>
        and receive $20 coupon for your first order when you checkout
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "75%",
          backgroundColor: "#F2F2F2",
          marginTop: 15,
        }}
      >
        <TextInput
          style={{ flex: 1, padding: 10 }}
          placeholder="Enter email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <View
          style={{ height: 28, borderRightWidth: 0.5, marginVertical: 1 }}
        />
        <TouchableOpacity onPress={handleSubscribe} style={{ padding: 10 }}>
          <Text style={{ padding: 10, fontWeight: "bold" }}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Subscribe;
