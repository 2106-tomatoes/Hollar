import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../store/user";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = props.history;
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [zipCode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
  const zipcodeHandler = (zipcodeInput) => {
    setZipcode(zipcodeInput);
  };
  const cityHandler = (cityInput) => {
    setCity(cityInput);
  };
  const stateHandler = (stateInput) => {
    setState(stateInput);
  };
  const passwordHandler = (passwordInput) => {
    setPassword(passwordInput);
  };
  const phoneNumberHandler = (phoneNumberInput) => {
    setPhoneNumber(phoneNumberInput);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(
      createUserThunk(
        username,
        firstName,
        lastName,
        email,
        zipCode,
        city,
        state,
        password,
        phoneNumber,
        navigation
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <View>
        <Fumi
          label={"Username"}
          iconClass={FontAwesomeIcon}
          iconName={"users"}
          iconColor={"#f95a25"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={usernameHandler}
          value={username}
        />
        <Fumi
          label={"First Name"}
          iconClass={FontAwesomeIcon}
          iconName={"user"}
          iconColor={"#f95a25"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={firstNameHandler}
          value={firstName}
        />
        <Fumi
          label={"Last Name"}
          iconClass={FontAwesomeIcon}
          iconName={"user"}
          iconColor={"#f95a25"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={lastNameHandler}
          value={lastName}
        />
        <Fumi
          label={"Email"}
          iconClass={FontAwesomeIcon}
          iconName={"envelope"}
          iconColor={"#f95a25"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={emailHandler}
          value={email}
        />

        <Fumi
          label={"Password"}
          iconClass={FontAwesomeIcon}
          iconName={"unlock"}
          iconColor={"#f95a25"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
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
const width = Dimensions.get("window").width-25;
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
    margin: 5,
    width:width

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
