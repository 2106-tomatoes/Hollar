import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function StartUp(props) {
  const history = props.history;
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={()=>navigation.navigate('Login')} />
      <Button title="Sign Up" onPress={()=>navigation.navigate('Signup')} />
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
