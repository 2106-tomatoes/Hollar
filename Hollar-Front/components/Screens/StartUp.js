import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function StartUp(props) {
  const history = props.history;
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={()=>history.push("/login")} />
      <Button title="Sign Up" onPress={()=>history.push("/signup")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
