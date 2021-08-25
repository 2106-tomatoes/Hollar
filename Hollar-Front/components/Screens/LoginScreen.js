import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import { connect, useDispatch } from "react-redux";
import { gotUserThunk } from '../../store/user'


const Login = (props) => {
  const history = props.history;

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (usernameInput) => {
    setUsername(usernameInput);
  };
  const passwordHandler = (passwordInput) => {
    setPassword(passwordInput);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(gotUserThunk(username, password, history));
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>username:</Text>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={usernameHandler}
        value={username}
      />
      <Text>password:</Text>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        onChangeText={passwordHandler}
        value={password}
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 20,
    fontSize: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Login;
