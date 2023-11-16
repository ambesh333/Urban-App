import { useEffect } from "react";
import Home from "./App/screens/home/Home";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./App/state";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Item from "./App/components/item";
import ItemDetails from "./App/screens/itemDetails/ItemDetails";
import Navbar from "./App/screens/global/Navbar";
import CartMenu from "./App/screens/global/CartMenu";
import Checkout from "./App/screens/checkout/Checkout";

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navbar />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Item" component={Item} />
          <Stack.Screen name="ItemDetails" component={ItemDetails} />
          <Stack.Screen name="checkout" component={Checkout} />
        </Stack.Navigator>
        <CartMenu />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
