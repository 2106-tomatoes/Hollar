import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { setOrigin } from "../../store/origin";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { findEventsThunk } from "../../store/event";
import { useNavigation } from "@react-navigation/native";

const NearbyEvents = () => {
  const origin = useSelector((state) => state.origin);
  const events = useSelector((state) => state.events);
  const [search, setSearch] = useState("");
  const [searchEvents, setsearchEvents] = useState([]);
  const dispatch = useDispatch();
  let displayEvents = [];
  const navigation = useNavigation();

  const searchHandler = (searchInput) => {
    setSearch(searchInput);
  };

  useEffect(() => {
    if (origin) {
      dispatch(findEventsThunk(origin));
    }
  }, [events.length]);

  useEffect(() => {
    if (search === "") return;

    const searchEvents = events.filter((event) => {
      return event.name.includes(search) || event.description.includes(search);
    });
    setsearchEvents(searchEvents);
  }, [search]);

  if (search === "") {
    displayEvents = events;
  } else {
    displayEvents = searchEvents;
  }

  if (origin === null || events === undefined) {
    console.log("this componenet went the null/undefined");
    return <View />;
  } else {
    return (
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
        >
          {origin !== null && (
            <Marker
              coordinate={{
                latitude: origin.latitude,
                longitude: origin.longitude,
              }}
              title="Current Location"
              identifier="current"
              pinColor="black"
            />
          )}
        </MapView>
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
        data={displayEvents}
        style={{ flex: 1 }}
        keyExtractor={item=>item.id.toString()}
        ItemSeparatorComponent={() => {
          return <View style={{height: 1, backgroundColor: '#DDDDDF'}} />;
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
            // onPress={() => {}}
            style={{ margin: 15 }}
            onPress={()=>navigation.navigate("SingleEvent", { eventId:item.id, eventTitle:item.name })}
          >
            <Text>{item.name}</Text>
            <Text>{item.location}</Text>
            <Text>{item.maxAttendees}</Text>
            <Text>{item.attendanceDate}</Text>
          </TouchableOpacity>
          )
        }}
        />
        {/* <View style={{ flex: 4 }}>
          {displayEvents.map((event) => {
            return (
              <TouchableOpacity
                // onPress={() => {}}
                key={event.id}
                style={{ margin: 15 }}
              >
                <Text>{event.name}</Text>
                <Text>{event.location}</Text>
                <Text>{event.maxAttendees}</Text>
                <Text>{event.attendanceDate}</Text>
              </TouchableOpacity>
            );
          })}
        </View> */}
      </View>
    );
  }
};

export default NearbyEvents;

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
  },
  inputContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    margin: 12,
    // height: "30%",
  },
  textInput: {
    backgroundColor: "#DDDDDE",
    borderRadius: 9999,
    height: 40,
    width: 300,
    margin: 12,
    // borderWidth: 1,
    paddingHorizontal: 20,
  },
});
