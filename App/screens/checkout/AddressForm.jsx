import React from "react";
import { View, TextInput, Text } from "react-native";

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const formattedName = (field) => `${type}.${field}`;

  const formattedError = (field) =>
    Boolean(touched[formattedName(field)] && errors[formattedName(field)]);

  const formattedHelper = (field) =>
    touched[formattedName(field)] && errors[formattedName(field)];

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 10,
        gap: 15,
      }}
    >
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="First Name"
        onBlur={handleBlur(formattedName("firstName"))}
        onChangeText={handleChange(formattedName("firstName"))}
        value={values.firstName}
      />
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="Last Name"
        onBlur={handleBlur(formattedName("lastName"))}
        onChangeText={handleChange(formattedName("lastName"))}
        value={values.lastName}
      />
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="Country"
        onBlur={handleBlur(formattedName("country"))}
        onChangeText={handleChange(formattedName("country"))}
        value={values.country}
      />
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="Street Address"
        onBlur={handleBlur(formattedName("street1"))}
        onChangeText={handleChange(formattedName("street1"))}
        value={values.street1}
      />
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="Street Address 2 (optional)"
        onBlur={handleBlur(formattedName("street2"))}
        onChangeText={handleChange(formattedName("street2"))}
        value={values.street2}
      />
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="City"
        onBlur={handleBlur(formattedName("city"))}
        onChangeText={handleChange(formattedName("city"))}
        value={values.city}
      />
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="State"
        onBlur={handleBlur(formattedName("state"))}
        onChangeText={handleChange(formattedName("state"))}
        value={values.state}
      />
      <TextInput
        style={{ width: "100%", borderWidth: 1, padding: 10 }}
        placeholder="Zip Code"
        onBlur={handleBlur(formattedName("zipCode"))}
        onChangeText={handleChange(formattedName("zipCode"))}
        value={values.zipCode}
      />
      {/* Display errors if any */}
      {formattedError("firstName") && (
        <Text style={{ color: "red" }}>{formattedHelper("firstName")}</Text>
      )}
      {formattedError("lastName") && (
        <Text style={{ color: "red" }}>{formattedHelper("lastName")}</Text>
      )}
      {formattedError("country") && (
        <Text style={{ color: "red" }}>{formattedHelper("country")}</Text>
      )}
      {formattedError("street1") && (
        <Text style={{ color: "red" }}>{formattedHelper("street1")}</Text>
      )}
      {formattedError("street2") && (
        <Text style={{ color: "red" }}>{formattedHelper("street2")}</Text>
      )}
      {formattedError("city") && (
        <Text style={{ color: "red" }}>{formattedHelper("city")}</Text>
      )}
      {formattedError("state") && (
        <Text style={{ color: "red" }}>{formattedHelper("state")}</Text>
      )}
      {formattedError("zipCode") && (
        <Text style={{ color: "red" }}>{formattedHelper("zipCode")}</Text>
      )}
    </View>
  );
};

export default AddressForm;
