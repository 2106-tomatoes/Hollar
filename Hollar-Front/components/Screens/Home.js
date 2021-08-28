import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { getChatListThunk } from "../../store/home";
import socketio from "../../socket";
import { setOrigin } from "../../store/origin";
import { useNavigation } from "@react-navigation/native";

const Home = (props) => {
  const { history } = props;
  const [displayList, setDisplayList] = useState([]);
  const user = useSelector((state) => state.user);
  const chatList = useSelector((state) => state.home.chatList);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      props.getChatList(user.id);
      dispatch(setOrigin({ latitude: 38.8977, longitude: -77.0365 }));
    });
  }, []);

  useEffect(() => {
    setDisplayList(chatList);
  }, [chatList.length]);

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

  function joinEventRoom(eventId) {
    console.log("Home, joinEventRoom, eventId:", eventId);
    navigation.navigate("Chatroom", { eventId });
    //Emit to join/create the room
    socketio.emit("joinRoom", eventId);
  }
  // console.log("chatList", chatList);
  // console.log("displayList", displayList);

  if (!displayList) {
    return (
      <View style={styles.container}>
        <Text>No messages</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={displayList}
      style={{margin: 40}}
      ItemSeparatorComponent={() => {
        return <View style={{height: 1, backgroundColor: '#DDDDDF'}} />;
      }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => joinEventRoom(item.id)}
            underlayColor="white"
            style={{flexDirection: 'row', paddingVertical: 20}}
          >
            <View>
              <Text style={{fontSize: 18}}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
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
