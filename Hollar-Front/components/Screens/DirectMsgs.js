import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  //Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { getDmChatListThunk } from "../../store/directMsgs";
import socketio from "../../socket";
import { useNavigation } from "@react-navigation/native";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';

const DirectMsgs = (props) => {
  const { user, chatList, getChatList } = props;
  const navigation = useNavigation();
  
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  let displayList = [];

  useEffect(() => {
    navigation.addListener("focus", () => {
      getChatList(user.id, user.username);
    });
  }, []);

  useEffect(() => {
    if (search === "") return;

    const searchEvents = chatList.filter((event) => {
      return event.name.includes(search);
    });
    setSearchList(searchEvents);
  }, [search]);

  function joinEventRoom(eventId, eventTitle) {
    console.log("DirectMsgs, joinEventRoom, eventId:", eventId);
    const dmEventId = eventId;
    
    //Changing eventTitle, to match the opposite user
    let dmEventTitle = '';
    let userToDm = eventTitle.split(' ')[1]; // "From otherUser"
    console.log('userToDm')
    dmEventTitle = `To ${userToDm}`;

    socketio.emit('joinDmRoom', { username: user.name, dmEventId });
    navigation.navigate("DirectMsgsRoom", { dmEventId, dmEventTitle });
  }

  const searchHandler = (searchInput) => {
    setSearch(searchInput);
  };

  if (search === "") {
    displayList = chatList;
  } else {
    displayList = searchList;
  }


  return (
    <>
      <View style={styles.inputContainer}>
      <Hideo
           iconClass={FontAwesomeIcon}
           iconName={'search'}
           iconColor={'white'}
           // this is used as backgroundColor of icon container view.
           iconBackgroundColor={'#f2a59d'}
           inputStyle={{ color: '#f2a59d',backgroundColor: "#DDDDDE"}}
           iconWidth={20}
          style={{width:320}}
          autoCapitalize="none"
       
          onChangeText={searchHandler}
          value={search}
        />
      </View>

      <FlatList
        data={displayList}
        style={{ marginHorizontal: 40 }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "#DDDDDF" }} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => joinEventRoom(item.id, item.name)}
              underlayColor="white"
              style={{ flexDirection: "row", paddingVertical: 20 }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 12,
  },
  textInput: {
    backgroundColor: "#DDDDDE",
    borderRadius: 9999,
    height: 40,
    width: 325,
    margin: 12,
    paddingHorizontal: 20,
  },
});


const mapStateToProps = (state) => {
  return {
    user: state.user,
    chatList: state.directMsgs.chatList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChatList: (userId, username) => dispatch(getDmChatListThunk(userId, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectMsgs);