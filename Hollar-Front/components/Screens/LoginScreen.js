import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native"; //Button here
import { connect, useDispatch } from "react-redux";
import { setUserThunk } from '../../store/user';
// import { Button, Icon } from '@ui-kitten/components';

const FacebookIcon = (props) => (
  <Icon name='facebook' {...props} />
);

const Login = (props) => {
  const history = props.history;
  const navigation = useNavigation()


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
    dispatch(setUserThunk(username, password, navigation));
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
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleSubmit} />
      <Button title="Back" onPress={() => navigation.goBack()} />
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
