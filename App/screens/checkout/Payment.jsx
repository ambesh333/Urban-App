import React from "react";
import { View, Text, TextInput } from "react-native";

const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <View style={{ marginVertical: 30, padding: 10, gap: 15 }}>
      {/* CONTACT INFO */}
      <View>
        <Text style={{ marginBottom: 15, fontSize: 18 }}>Contact Info</Text>
        <TextInput
          style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
          placeholder="Email"
          onBlur={handleBlur("email")}
          onChangeText={handleChange("email")}
          value={values.email}
        />
        {touched.email && errors.email && (
          <Text style={{ color: "red" }}>{errors.email}</Text>
        )}
        <TextInput
          style={{ borderWidth: 1, padding: 10 }}
          placeholder="Phone Number"
          onBlur={handleBlur("phoneNumber")}
          onChangeText={handleChange("phoneNumber")}
          value={values.phoneNumber}
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <Text style={{ color: "red" }}>{errors.phoneNumber}</Text>
        )}
      </View>
    </View>
  );
};

export default Payment;
