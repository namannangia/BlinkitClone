import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "../pages/Homepage";
import Cart from "../pages/Cart";
import HomeIcon from "../assets/home.svg";
import CartIcon from "../assets/shopping-cart.svg";

function BottomTabs() {
  const BottomTabs = createBottomTabNavigator();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon fill={focused ? "#0a3b64" : "#aaa"} />
          ),
          tabBarLabel: () => null,
        }}
        name="homepage"
        component={Homepage}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <CartIcon fill={focused ? "#0a3b64" : "#fff"} />
          ),
          tabBarLabel: () => null,
        }}
        name="cart"
        component={Cart}
      />
    </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default BottomTabs;
