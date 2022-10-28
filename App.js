import HomeScreen from "./components/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ResultadosScreen from "./components/screens/ResultadosScreen";
import React, { useState, useEffect } from "react";
import ErrorScreen from "./components/screens/ErrorScreen";
import { useColorScheme } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Resultados"
          component={ResultadosScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ErrorScreen"
          component={ErrorScreen}
          options={{ headerTitleAlign: "center", headerTitle: "Error" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
