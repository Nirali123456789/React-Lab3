import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { InfoScreen, TDetailScreen, TListScreen,} from "../screens";
import { Screen } from "../utils";
import { AppTabBar } from "../components";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TransactionStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Screen.ListScreen}
        component={TListScreen}
      />
      <Stack.Screen
        name={Screen.DetailScreen}
        component={TDetailScreen}
      />
    </Stack.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <AppTabBar {...props} />}
      >
        <Tab.Screen
          name={Screen.TransactionStack}
          component={TransactionStack}
        />
        <Tab.Screen
          name={Screen.InfoScreen}
          component={InfoScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Route;
