import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "../pages/Homepage";
import Cart from "../pages/Cart";
import Icon from "react-native-vector-icons/Feather";

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
            <Icon name="home" size={30} color={focused ? "#0a3b64" : "#aaa"} />
          ),
          tabBarLabel: () => null,
        }}
        name="homepage"
        component={Homepage}
      />
      <BottomTabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shopping-cart"
              size={30}
              color={focused ? "#0a3b64" : "#aaa"}
            />
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
