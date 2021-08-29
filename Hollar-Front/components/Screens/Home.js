import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { getChatListThunk } from "../../store/home";
import socketio from "../../socket";
import { setOrigin } from "../../store/origin";
import { useNavigation } from "@react-navigation/native";

const Home = (props) => {
  const { history } = props;
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const user = useSelector((state) => state.user);
  const chatList = useSelector((state) => state.home.chatList);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let displayList = [];

  useEffect(() => {
    navigation.addListener("focus", () => {
      props.getChatList(user.id);
      dispatch(setOrigin({ latitude: 38.8977, longitude: -77.0365 }));
    });
  }, []);

  useEffect(() => {
    if (search === "") return;

    const searchEvents = chatList.filter((event) => {
      return event.name.includes(search);
    });
    setSearchList(searchEvents);
  }, [search]);

  const getCurrentLocation = async () => {
    // if(!Location.hasServicesEnabledAsync()){
    await Location.requestForegroundPermissionsAsync();
    // }
    console.log(
      "address",
      await Location.geocodeAsync(
        "1600 Pennsylvania Ave NW, Washington, DC 20006"
      )
    );
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    const getCurrentLocation = { latitude, longitude };
    console.log("get", getCurrentLocation);
    dispatch(setOrigin(getCurrentLocation));
  };

  function joinEventRoom(eventId, eventTitle) {
    console.log("Home, joinEventRoom, eventId:", eventId);
    navigation.navigate("Chatroom", { eventId, eventTitle });
    //Emit to join/create the room
    socketio.emit("joinRoom", eventId);
  }

  const searchHandler = (searchInput) => {
    setSearch(searchInput);
  };

  if (search === "") {
    displayList = chatList;
  } else {
    displayList = searchList;
  }

  if (!displayList) {
    return (
      <View style={styles.container}>
        <Text>No messages</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Search Events"
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
};
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
    chatList: state.home.chatList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getChatList: (userId) => dispatch(getChatListThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
