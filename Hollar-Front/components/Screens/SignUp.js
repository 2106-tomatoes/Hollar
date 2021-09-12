import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../store/user";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = props.history;
  const navigation = useNavigation();

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
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Username"
          style={styles.textInput}
          onChangeText={usernameHandler}
          value={username}
        />
        <TextInput
          placeholder="First Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={firstNameHandler}
          value={firstName}
        />
        <TextInput
          placeholder="Last Name"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lastNameHandler}
          value={lastName}
        />
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={emailHandler}
          value={email}
        />

        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={passwordHandler}
          value={password}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    borderWidth: 2,
    borderRadius: 3,
    height: 40,
    fontSize: 15,
    paddingLeft: 80,
    paddingRight: 80,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    textAlign: "center",
  },

  buttonContainer: {
    // margin: 5,
  },
  inputContainer: {
    flexDirection: "row",
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
  headerText: {
    fontSize: 45,
  },
});
