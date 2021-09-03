import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
// import styles from "../styling/main.js";
export default function StartUp(props) {
  const history = props.history;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/Hollar.png")}
          style={styles.logo}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    margin: 5,
  },
  logo: {
    height: 300,
    width: 300,
  },
  button: {
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 3,
    color: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: "#669BBC",
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});
