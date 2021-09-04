import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Button
} from "react-native";
import * as Location from "expo-location";
import { setOrigin } from "../../store/origin";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { findEventsThunk, findEvent } from "../../store/event";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { withRouter } from "react-router";


const NearbyEvents = () => {
  const origin = useSelector((state) => state.origin);
  const events = useSelector((state) => state.events);
  const demo = useSelector(state => state.demo)
  const [search, setSearch] = useState("");
  const [searchEvents, setsearchEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("20");

  const dispatch = useDispatch();
  let displayEvents = [];
  const navigation = useNavigation();
  const mapRef = useRef()

  const searchHandler = (searchInput) => {
    setSearch(searchInput);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      console.log('use effect is working')
      if (origin) {
        console.log('if statement is happening',origin)
        dispatch(findEventsThunk(origin, selectedValue));
        mapRef.current.animateCamera({center: {latitude: origin.latitude, longitude: origin.longitude}})
      }
    });
  }, [events.length]);

  useEffect(() => {
    if (search === "") return;

    const searchEvents = events.filter((event) => {
      return event.name.includes(search) || event.description.includes(search);
    });
    setsearchEvents(searchEvents);
  }, [search]);
  
  // useEffect(() => {
  //   mapRef.current.animateCamera({center: {latitude: origin.latitude, longitude: origin.longitude}})
  // }, [demo])
  

  function handleRefresh() {
    setRefreshing(true);
    dispatch(findEventsThunk(origin, selectedValue));
    setRefreshing(false);
  }

  if (search === "") {
    displayEvents = events;
  } else {
    displayEvents = searchEvents;
  }

  if (origin === null || events === undefined) {

    return <View />;
  } else {
    // console.log('search',events)
    // console.log("origin in nearby events", origin)
    return (
      // <View style={[styles.container, {backgroundColor: modalVisible ? '#000000' : ''}}>
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          ref={mapRef}
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
          {displayEvents &&
            displayEvents.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.name}
                  description={marker.description}
                  pinColor="red"
                  onPress={() => {
                    setSearch(marker.name)
                  }}
                />
              );
            })}
        </MapView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Search Events"
            onChangeText={searchHandler}
            value={search}/>
          
          {search!==""&&   <Pressable
            style={styles.closeButtonParent}
            placeholder="X"
            onPress={() => setSearch("")}
          >
          <Text style={styles.closeButton}>X</Text>
       
              
          </Pressable>}
        </View>
        <View style={styles.radiusButtonContainer}>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Set Radius</Text>
          </Pressable>
        </View>
        <Button title="Center Self" onPress={async () => {
          mapRef.current.animateCamera({center: {latitude: origin.latitude, longitude: origin.longitude}})
        }}/>
        <FlatList
          data={displayEvents}
          style={{ flex: 1 }}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 1, backgroundColor: "#DDDDDF" }} />;
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={({ item }) => {
       
            return (
              <TouchableOpacity
                // onPress={() => {}}
                style={{ margin: 15 }}
                onPress={() =>
                  navigation.navigate("SingleEvent", {
                    eventId: item.id,
                    eventTitle: item.name,
                  })
                }
              >
                <Text>Event: {item.name}</Text>
                <Text>Location: {item.location}</Text>
                <Text>Attendance: {item.users.length}/{item.maxAttendees}</Text>
                <Text>Event Date: {item.attendanceDate}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 200, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="20" value="20" />
                <Picker.Item label="25" value="25" />
                <Picker.Item label="50" value="50" />
              </Picker>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { height: 35, width: 100 },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  dispatch(findEventsThunk(origin, Number(selectedValue)));
                }}
              >
                <Text style={{ textAlign: "center" }}>Set Radius</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
 
  textInput: {
    backgroundColor: "#DDDDDE",
    borderRadius: 9999,
    height: 40,
    width: 320,
    margin: 12,
    // borderWidth: 1,
    paddingHorizontal: 20,
    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginHorizontal: 50,
    backgroundColor: "white",
    borderRadius: 20,

    paddingHorizontal: 75,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    marginBottom: 10,
    padding: 5,
    elevation: 2,
    width: 100,
    alignItems: "center",
  },
  buttonOpen: {
    backgroundColor: "#E4572E",
  },
  buttonClose: {
    backgroundColor: "#E4572E",
  },
  radiusButtonContainer: {
    alignItems: "center",
  }, 
  inputContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    margin: 12,
    // height: "30%",
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    left: -35,
    zIndex: 10
  },
  closeButton: {
    height: 15,
    width: 10,
  },
});
