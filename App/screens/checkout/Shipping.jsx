import React from "react";
import { View, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <View style={{ margin: 30, marginTop: 30 }}>
      {/* BILLING FORM */}
      <View>
        <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold" }}>
          Billing Information
        </Text>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <CheckBox
          title="Same for Shipping Address"
          containerStyle={{ backgroundColor: "transparent" }}
          checkedColor="black"
          checked={values.shippingAddress.isSameAddress}
          onPress={() =>
            setFieldValue(
              "shippingAddress.isSameAddress",
              !values.shippingAddress.isSameAddress
            )
          }
        />
      </View>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && (
        <View>
          <Text style={{ marginBottom: 15, fontSize: 18, fontWeight: "bold" }}>
            Shipping Information
          </Text>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </View>
      )}
    </View>
  );
};

export default Shipping;
