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
} from "react-native"; //Button here
import { connect, useDispatch } from "react-redux";
import { setUserThunk } from "../../store/user";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
// import { Button, Icon } from '@ui-kitten/components';

const FacebookIcon = (props) => <Icon name="facebook" {...props} />;

const Login = (props) => {
  const history = props.history;
  const navigation = useNavigation();

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
      <Text style={styles.headerText}>Login</Text>
      <View>
        <View style={styles.inputContainer}>
          <Fumi
            label={"Username"}
            iconClass={FontAwesomeIcon}
            iconName={"user"}
            iconColor={"#f95a25"}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={usernameHandler}
            value={username}
          />
        </View>
        <Fumi
          label={"Password"}
          iconClass={FontAwesomeIcon}
          iconName={"unlock"}
          iconColor={"#f95a25"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
          style={styles.textInput}
          autoCapitalize="none"
          // placeholder="Password"
          onChangeText={passwordHandler}
          value={password}
          secureTextEntry={true}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
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

export default Login;
