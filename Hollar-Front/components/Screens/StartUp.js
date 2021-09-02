import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";

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
          <Button
            title="Login"
            color="#669BBC"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            color="#669BBC"
            onPress={() => navigation.navigate("Signup")}
          />
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
    // filter: drop - shadow("30px 10px 4px #4444dd"),
  },
  logo: {
    height: 300,
    width: 300,
    // margin: 15,
    // padding: 15,
  },
});
