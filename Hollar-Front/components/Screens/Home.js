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
  Platform
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { getChatListThunk } from "../../store/home";
import socketio from "../../socket";
import { setOrigin } from "../../store/origin";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo } from 'react-native-textinput-effects';

const Home = (props) => {
  const { history } = props;
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);
  const user = useSelector((state) => state.user);
  const username = user.username;
  const chatList = useSelector((state) => state.home.chatList);
  const demo = useSelector(state => state.demo)
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let displayList = [];

  useEffect(() => {
    navigation.addListener("focus", () => {
      props.getChatList(user.id);
      // console.log("demo in Home useEffect", demo)
      // if(demo===true){
      //   console.log("demo is true set origin WH")
      //   dispatch(setOrigin({ latitude: 38.8977, longitude: -77.0365 }));
      // } else {
      //   console.log("demo is false set current location")
      //   getCurrentLocation()
      // }
    });
  }, []);
  useEffect(() => {
    if(!demo){
      console.log("demo is false set current location")
      getCurrentLocation()
    }
    // if(demo===true){
    //   // console.log("demo is true set origin WH")
    //   // dispatch(setOrigin({ latitude: 38.8977, longitude: -77.0365 }));
    // } else {
    //   console.log("demo is false set current location")
    //   getCurrentLocation()
    // }
  }, [demo])

  useEffect(() => {
    if (search === "") return;

    const searchEvents = chatList.filter((event) => {
      return event.name.includes(search);
    });
    setSearchList(searchEvents);
  }, [search]);

  const getCurrentLocation = async () => {
    //for IOS 
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') {
    //   console.log('Permission to access location was denied');
    //   return;
    // }

    // let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});

    // let location = {latitude,longitude}

    // dispatch(setOrigin(location));

    // for android



    // console.log("Before Background Request")
    // await Location.requestBackgroundPermissionsAsync();
    // console.log("Before Foreground Request")
    
    // await Location.requestForegroundPermissionsAsync();
    
    // console.log("Before getCurrentPosition Request")
    

    // const {
    //   coords: { latitude, longitude },
    // } = await Location.getCurrentPositionAsync({})
    
    
    

    // const getCurrentLocation = { latitude, longitude };
    // console.log("get", getCurrentLocation);
    
    
    //Examples
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') {
    //   console.log('Permission to access location was denied');
    //   return;
    // }
    let foreground = await Location.requestForegroundPermissionsAsync();

    console.log("Past Foreground permission", foreground)
    
    if( Platform.OS === 'android') {
      console.log('this is an android')
      let {coords: {latitude, longitude}} = await Location.getLastKnownPositionAsync();
      const androidLocation = { latitude, longitude}
      console.log('Android Location', androidLocation);
      dispatch(setOrigin(androidLocation));
    } else if (Platform.OS === 'ios'){
      console.log('this is apple')
        let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({});
        let iosLocation = {latitude,longitude}
        console.log(`iosLocation`, iosLocation)
        dispatch(setOrigin(iosLocation));
    }
    

    
    
    
  };

  function joinEventRoom(eventId, eventTitle) {
  
    navigation.navigate("Chatroom", { eventId, eventTitle });
    //Emit to join/create the room
    socketio.emit('joinRoom', { username, eventId });
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
        <Text>RSVP to Nearby Events</Text>
      </View>
    );
  }
  console.log(`user home`, user)
  console.log(`displayedList`, chatList)
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
      {displayList.length<=0?<Text> No Events Here! Go to Nearby Events to get started!</Text>:
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
              onLongPress={()=>navigation.navigate("SingleEvent", {
                eventId: item.id,
                eventTitle: item.name,
              })}
              underlayColor="white"
              style={{ flexDirection: "row", paddingVertical: 20 }}
            >
              <View>
                <Text style={{ fontSize: 18 }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />}
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
