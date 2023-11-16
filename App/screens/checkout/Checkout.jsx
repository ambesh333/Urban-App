import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { shades } from "../../theme";

import Shipping from "./Shipping";
import Payment from "./Payment";
import {
  CardField,
  StripeProvider,
  useStripe,
} from "@stripe/stripe-react-native";

const Checkout = () => {
  const { confirmSetupIntent } = useStripe();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const [showCardField, setShowCardField] = useState(false);

  const handlePayPress = async (formikProps) => {
    setShowCardField(true);
    const { values } = formikProps;
    const error = await makePayment(values);

    if (error) {
      console.log("Payment failed", error);
    } else {
      console.log("Payment succeeded");
    }
  };

  async function makePayment(values) {
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };
    console.log(requestBody);

    const response = await fetch(`http://192.168.1.2:1337/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    console.log(session);

    const { error } = await confirmSetupIntent(session.id, {
      paymentMethodType: "Card",
    });

    if (error) {
      console.log("Payment failed", error);
    } else {
      console.log("Payment succeeded");
    }
    return { error };
  }
  const handleFormSubmit = (values, actions, handlePayPress) => {
    setActiveStep(activeStep + 1);
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }
    if (isSecondStep) {
      handlePayPress(values);
    }
    actions.setTouched({});
  };

  const initialValues = {
    billingAddress: {
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    shippingAddress: {
      isSameAddress: true,
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    email: "",
    phoneNumber: "",
  };

  const checkoutSchema = [
    yup.object().shape({
      billingAddress: yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        country: yup.string().required("required"),
        street1: yup.string().required("required"),
        street2: yup.string(),
        city: yup.string().required("required"),
        state: yup.string().required("required"),
        zipCode: yup.string().required("required"),
      }),
      shippingAddress: yup.object().shape({
        isSameAddress: yup.boolean(),
        firstName: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        lastName: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        country: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        street1: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        street2: yup.string(),
        city: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        state: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
        zipCode: yup.string().when("isSameAddress", {
          is: false,
          then: yup.string().required("required"),
        }),
      }),
    }),
    yup.object().shape({
      email: yup.string().required("required"),
      phoneNumber: yup.string().required("required"),
    }),
  ];

  return (
    <StripeProvider publishableKey="pk_test_51NzfrxSAMTNILZyApxIOeL6fok1oYt9dIirgxugDmWJtcuKWKyUrSPH70CspxU9ZZwb4uifUL82seWtPsownflrT00GssUUOyv">
      <View style={{ width: "100%" }}>
        <Formik
          onSubmit={(values, actions) =>
            handleFormSubmit(values, actions, handlePayPress)
          }
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <ScrollView>
              <View>
                {isFirstStep && (
                  <Shipping
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                  />
                )}
                {isSecondStep && (
                  <>
                    <Payment
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      setFieldValue={setFieldValue}
                    />

                    <CardField
                      postalCodeEnabled={true}
                      placeholder={{
                        number: "4242 4242 4242 4242",
                      }}
                      cardStyle={{
                        backgroundColor: "#FFFFFF",
                        textColor: "#000000",
                      }}
                      style={{
                        width: "100%",
                        flex: 1,
                        flexDirection: "column",
                        height: 50,
                        marginVertical: 30,
                      }}
                    />
                  </>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    marginBottom: 30,
                  }}
                >
                  {!isFirstStep && (
                    <TouchableOpacity
                      onPress={() => setActiveStep(activeStep - 1)}
                      style={{
                        backgroundColor: shades.primary[200],
                        width: "48%",
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
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
                        Back
                      </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={
                      isSecondStep
                        ? () => handlePayPress({ values })
                        : handleSubmit
                    }
                    style={{
                      backgroundColor: shades.primary[400],
                      width: isFirstStep ? "100%" : "48%",
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
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
                      {isSecondStep ? "Place Order" : "Next"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
    </StripeProvider>
  );
};

export default Checkout;
