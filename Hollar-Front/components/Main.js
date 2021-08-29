import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";
// import { io } from "socket.io-client";
import IP from "./env";
import SinglePageNavigator from "./Route/SinglePageNavigator";

class Main extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   socket: {},
    // };
  }
  // componentDidMount() {
  //   const socket = io(`${IP}`);
  //   this.setState({
  //     socket: socket,
  //   });
  // }

  render() {
    return <SinglePageNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    // count: state.count,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // actions: (count) => dispatch(changeCount(count)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
