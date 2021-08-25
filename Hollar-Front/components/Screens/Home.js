import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { getChatListThunk } from "../../store/chatroom";

const Home = (props) => {
  const { history, eventList } = props;
  const user = useSelector((state) => state.user);

  useEffect(() => {
    props.getChatList(user.id);
  }, []);

  if (eventList.length === 0) {
    return (
      <View>
        <Text>No messages</Text>
      </View>
    );
  }

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={[
    //       {key: 'Devin'},
    //       {key: 'Dan'},
    //       {key: 'Dominic'},
    //       {key: 'Jackson'},
    //       {key: 'James'},
    //       {key: 'Joel'},
    //       {key: 'John'},
    //       {key: 'Jillian'},
    //       {key: 'Jimmy'},
    //       {key: 'Julie'},
    //     ]}
    //     renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
    //   />
    // </View>

    <View style={styles.container}>
      <Button
        title="Create An Event!"
        onPress={() => history.push("/createevent")}
      />
      {eventList.map((event) => {
        return (
          <TouchableHighlight
            key={event.id}
            onPress={() => history.push(`/chatroom/${event.id}`)}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>{event.name}</Text>
              <Text style={styles.buttonText}>{event.maxAttendees}</Text>
              <Text style={styles.buttonText}>{event.location}</Text>
              <Text style={styles.buttonText}>{event.description}</Text>
            </View>
          </TouchableHighlight>
        );
      })}

      <Button title="Logout" onPress={() => history.push("/")} />
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
});

const mapStateToProps = (state) => {
  return {
    eventList: state.chatroom.chatList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getChatList: (userId) => dispatch(getChatListThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
