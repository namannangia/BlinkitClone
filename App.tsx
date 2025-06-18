/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from "@react-native/new-app-screen";
import { StatusBar, StyleSheet, useColorScheme, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/pages/Homepage";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBar,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import BottomTabs from "./src/navigation/BottomTabs";
import ProductDetails from "./src/pages/ProductDetails";

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="main" component={BottomTabs} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
