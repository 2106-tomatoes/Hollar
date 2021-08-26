
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";

import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home";
import Chatroom from "../Screens/Chatroom"
import SignUp from "../Screens/SignUp"
import StartUp from "../Screens/StartUp"
import CreateEvent from "../Screens/CreateEvent"

export default class Routes extends React.Component {
    constructor(props) {
      super(props);

    }


  render() {

    const socket = this.props.socket

    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={StartUp}  />
            <Route exact path="/login" component={LoginScreen}  />
            <Route exact path="/signup" component={SignUp}  />
            <Route exact path="/home" component={Home} />
            <Route exact path="/createevent" component={CreateEvent} />
            {/* <Route exact path="/chatroom" component={Chatroom} /> */}
            <Route path="/chatroom/:id" render={({match})=><Chatroom socket={socket} match={match}/>} />
          </Switch>
        </View>
      </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
