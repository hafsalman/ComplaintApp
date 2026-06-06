import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../services/api";

export default function LoginScreen({ navigation }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    console.log("BUTTON PRESSED");

    try {
      const res = await api.post("login.php", {
        username,
        password,
      });

      if (res.data.success) {
        navigation.replace("Complaints");
      } else {
        Alert.alert("Invalid Login");
      }
    } catch (e) {
      Alert.alert("Server Error");
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", padding: 20 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        <TextInput
          placeholder="Username"
          style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
          onChangeText={setUsername}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
          onChangeText={setPassword}
        />

        <Button title="Login" onPress={login} />

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}