import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native"; //Button here
import { connect, useDispatch } from "react-redux";
import { setUserThunk } from "../../store/user";


const Login = (props) => {
  const history = props.history;
  const navigation = useNavigation();
  const { setUser } = props;

  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const usernameHandler = (usernameInput) => {
    setUsername(usernameInput);
  };
  const passwordHandler = (passwordInput) => {
    setPassword(passwordInput);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // dispatch(setUserThunk(username, password, navigation));
    const response = await setUser(username, password, navigation);
    setErrMsg(response);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login</Text>
      <Text style={{color: 'red'}}>{errMsg}</Text>
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={usernameHandler}
            value={username}
          />
        </View>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
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

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (username, password, navigation) => dispatch(setUserThunk(username, password, navigation))
  }
}

export default connect(null, mapDispatchToProps)(Login);
