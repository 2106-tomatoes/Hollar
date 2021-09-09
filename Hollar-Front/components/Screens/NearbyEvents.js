import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  // FlatList,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Button,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  RefreshControl
} from "react-native";
import * as Location from "expo-location";
import { setOrigin } from "../../store/origin";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { findEventsThunk, findEvent } from "../../store/event";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { withRouter } from "react-router";
import CalendarPicker from "react-native-calendar-picker";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome";
import { Hideo } from "react-native-textinput-effects";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { FlatList } from 'react-native-gesture-handler';

const NearbyEvents = () => {
  const origin = useSelector((state) => state.origin);
  const events = useSelector((state) => state.events);
  const demo = useSelector((state) => state.demo);
  const [search, setSearch] = useState("");
  const [searchEvents, setsearchEvents] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [calmodalVisible, setCalModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState("20");
  const currentDate = new Date();
  const [newdate, setNewDate] = useState(
    currentDate.toISOString().slice(0, 10)
  );
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  const phoneWidth = Dimensions.get("window").width;

  const dispatch = useDispatch();
  let displayEvents = [];
  const navigation = useNavigation();
  const mapRef = useRef();
  const fixedheight = Dimensions.get("window").height*.15;
  console.log(`fixedheight`, fixedheight)

  const searchHandler = (searchInput) => {
    setSearch(searchInput);
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      console.log('thisis the origin',origin)
      if (origin) {
        console.log('finding the events!')
        dispatch(findEventsThunk(origin, selectedValue, newdate));
        mapRef.current.animateCamera({
          center: { latitude: origin.latitude, longitude: origin.longitude },
        });
      }
    });
  }, [events,origin]);

  useEffect(() => {
    if (search === "") return;

    const searchEvents = events.filter((event) => {
      return event.name.includes(search) || event.description.includes(search);
    });
    setsearchEvents(searchEvents);
  }, [search,events]);

  // useEffect(() => {
  //   mapRef.current.animateCamera({center: {latitude: origin.latitude, longitude: origin.longitude}})
  // }, [demo])

  const onDateConfirm = () => {
    dispatch(findEventsThunk(origin, selectedValue, newdate));
  };
  const DateChange = (date) => {
    const newdate = date.toISOString().slice(0, 10);

    setNewDate(newdate);
  };

  function handleRefresh() {
    setRefreshing(true);
    dispatch(findEventsThunk(origin, selectedValue, newdate));
    setRefreshing(false);
  }

  if (search === "") {
    displayEvents = events;
  } else {
    displayEvents = searchEvents;
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "white",
        padding: 16,
        height: 450,
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="caret-down" size={20} style={{ bottom: 10 }}></Icon>
      </View>
      <FlatList
        data={displayEvents}
        style={{ flex: 1 }}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 1, backgroundColor: "#DDDDDF" }} />;
        }}
        refreshControl={
          <RefreshControl

        refreshing={refreshing}
        onRefresh={()=>handleRefresh()}
        />
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              // onPress={() => {}}
              style={{ margin: 15 }}
              onPress={() =>
                mapRef.current.animateCamera({
                  center: {
                    latitude: item.latitude,
                    longitude: item.longitude,
                  },
                })
              }
              onLongPress={() =>
                navigation.navigate("SingleEvent", {
                  eventId: item.id,
                  eventTitle: item.name,
                })
              }
            >
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
                {item.name.toUpperCase()}
              </Text>
              <Text>Location: {item.location}</Text>
              <Text>
                Attendance: {item.users.length}/{item.maxAttendees}
              </Text>
              <Text>
                Event Date: {item.attendanceDate} {item.time}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

  const sheetRef = React.useRef(null);

  if (origin === null || events === undefined) {
    return <View />;
  } else {
    return (
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
                  title={marker.name.toUpperCase()}
                  description={marker.description}
                  pinColor="red"
                  onPress={() => {
                    sheetRef.current.snapTo(0);
                    setSearch(marker.name);
                  }}
                />
              );
            })}
        </MapView>

        <View style={styles.inputContainer}>
          <Hideo
            iconClass={FontAwesomeIcon}
            iconName={"search"}
            iconColor={"white"}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={"#f2a59d"}
            inputStyle={{ color: "#f2a59d", backgroundColor: "#DDDDDE" }}
            iconWidth={20}
            autoCapitalize="none"
            placeholder="Search Events"
            onChangeText={searchHandler}
            value={search}
          />

          {search !== "" && (
            <Pressable
              style={styles.closeButtonParent}
              placeholder="X"
              onPress={() => setSearch("")}
            >
              <Text style={styles.closeButton}>X</Text>
            </Pressable>
          )}
        </View>
        <View style={styles.radiusButtonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>{selectedValue} Miles</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setCalModalVisible(true)}
          >
            <Text style={styles.textStyle}>{newdate}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flex: 1, position: "absolute", top: 78, left: width - 40 }}
        >
          <TouchableOpacity style={{marginBottom:20}}
            onPress={handleRefresh}>

            <Icon name="refresh" size={30} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              mapRef.current.animateCamera({
                center: {
                  latitude: origin.latitude,
                  longitude: origin.longitude,
                },
              });
            }}
          >
            <Icon name="bullseye" size={30} />
          </TouchableOpacity>
        </View>
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
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonClose,
                  { height: 35, width: 100 },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  dispatch(
                    findEventsThunk(origin, Number(selectedValue), newdate)
                  );
                }}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Set Radius
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={calmodalVisible}
          onRequestClose={() => {
            setCalModalVisible(!calmodalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text>{newdate} </Text>
              <CalendarPicker onDateChange={DateChange} />
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.buttonClose,
                  { height: 35, width: 100 },
                ]}
                onPress={() => {
                  onDateConfirm();
                  setCalModalVisible(!calmodalVisible);
                }}
              >
                <Text style={{ textAlign: "center", color: "white" }}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View
          style={{
            backgroundColor: "papayawhip",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button title="Events" onPress={() => sheetRef.current.snapTo(0)} />
        </View>

        <BottomSheet
          ref={sheetRef}
          snapPoints={[fixedheight, 300, 200, 100, 450]}
          borderRadius={10}
          renderContent={renderContent}
          style={{ position: "absolute", zIndex: 3, elevation: 3 }}
          // enabledGestureInteraction={true}
          enabledContentTapInteraction={false}
        />
      </View>
    );
  }
};
const width = Dimensions.get("window").width;
export default NearbyEvents;

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
    backgroundColor: "#f2a59d",
    marginHorizontal: 5,
  },
  buttonClose: {
    backgroundColor: "#E4572E",
  },
  radiusButtonContainer: {
    position: "absolute",
    top: 80,
    left: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 1,
    zIndex: 1,
  },
  inputContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 40,
    margin: 12,
    position: "absolute",
    width: width - 20,
    top: 10,
    // height: "30%",
  },
  closeButtonParent: {
    justifyContent: "center",
    alignItems: "center",
    left: -35,
    zIndex: 10,
  },
  closeButton: {
    height: 15,
    width: 10,
  },
  calendarImage: {
    width: 20,
    height: 20,
    resizeMode: "stretch",
  },
  textStyle: {
    color: "white",
  },
});
