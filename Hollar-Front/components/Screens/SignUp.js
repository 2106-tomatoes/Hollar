import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../store/user";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = props.history;
  const navigation = useNavigation()

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const usernameHandler = (usernameInput) => {
    setUsername(usernameInput);
  };
  const firstNameHandler = (firstNameInput) => {
    setFirstName(firstNameInput);
  };
  const lastNameHandler = (lastNameInput) => {
    setLastName(lastNameInput);
  };
  const emailHandler = (emailInput) => {
    setEmail(emailInput);
  };
  const passwordHandler = (passwordInput) => {
    setPassword(passwordInput);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      createUserThunk(
        username,
        firstName,
        lastName,
        email,
        password,
        navigation
      )
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text>Sign Up</Text>
      <Text>username:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={usernameHandler}
        value={username}
      />
      <Text>First Name:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={firstNameHandler}
        value={firstName}
      />
      <Text>Last Name:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={lastNameHandler}
        value={lastName}
      />
      <Text>Email:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={emailHandler}
        value={email}
      />
      <Text>password:</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={passwordHandler}
        value={password}
      />
      
      <Button title="Sign Up" onPress={handleSubmit} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </KeyboardAvoidingView>
  );
};

// username: {
//   type: Sequelize.STRING,
//   unique: true,
//   allowNull: false,
// },
// firstName: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },
// lastName: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },
// email: {
//   type: Sequelize.STRING,
//   unique: true,
//   allowNull: false,
// },
// zipCode: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
// },
// city: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },
// state: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },
// password: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },
// phoneNumber: {
//   type: Sequelize.STRING,
//   allowNull: false,
// },

export default SignUp;

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
