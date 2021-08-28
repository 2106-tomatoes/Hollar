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

const NearbyEvents = () => {
  const origin = useSelector((state) => state.origin);
  const events = useSelector((state) => state.events);
  const [search, setSearch] = useState("");
  const [searchEvents, setsearchEvents] = useState([]);
  const dispatch = useDispatch();
  let displayEvents = [];

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
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
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
            placeholder="Search Hobbies"
            onChangeText={searchHandler}
            value={search}
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
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
        </ScrollView>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: -175,
    height: "30%",
  },
  textInput: {
    backgroundColor: "#DDDDDE",
    borderRadius: 9999,
  },
});
