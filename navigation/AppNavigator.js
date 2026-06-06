import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import ComplaintList from "../screens/ComplaintList";
import AddComplaint from "../screens/AddComplaint";
import EditComplaint from "../screens/EditComplaint";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Complaints" component={ComplaintList}/>
      <Stack.Screen name="Add" component={AddComplaint}/>
      <Stack.Screen name="Edit" component={EditComplaint}/>
    </Stack.Navigator>
  );
}