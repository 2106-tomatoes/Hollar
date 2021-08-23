
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";

import Home from "../Screens/Home";
import Test from "../Screens/Test";

export default class Routes extends React.Component {
  render() {
    return (
      <NativeRouter>
        <View style={styles.container}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/test" component={Test} />
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