import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import firebase from "../database/firebaseDB";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const db = firebase.firestore();

export default function ChatScreen({ navigation }) {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //logged in
        navigation.navigate("Chat", { id: user.id, email: user.email });
      } else {
        //logged out, get kicked back to Login page
        navigation.navigate("Login");
      }
    });

    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={logout}>
          <MaterialCommunityIcons
            name="logout"
            size={24}
            color="grey"
            style={{ marginRight: 20 }}
          />
        </TouchableOpacity>
      ),
    });
  }, []);

  function logout() {
    firebase.auth().signOut();
  }

  return (
    <View>
      <Text>Chat</Text>
    </View>
  );
}
