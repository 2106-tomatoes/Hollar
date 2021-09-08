import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { editEventThunk } from "../../store/SingleEvent";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import CalendarPicker from "react-native-calendar-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import debounce from "lodash.debounce";
import { getPlacesThunk, clearPlaces } from "../../store/googlePlaces";
import * as Location from "expo-location";

const EditEvent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const singleEvent = props.route.params.singleEvent;
  const ref = useRef();
  const currentDate = new Date();
  const debouncedLocation = useCallback(
    debounce((location) => dispatch(getPlacesThunk(location)), 1000),
    []
  );

  const [name, setName] = useState("");
  const [maxAttendees, setmaxAttendees] = useState("");
  const [location, setlocation] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [description, setDescription] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [calModalVisible, setCalModalVisible] = useState(false);
  const [time, setTime] = useState(currentDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const places = useSelector((state) => state.places);

  useEffect(() => {
    setName(singleEvent.name);
    setmaxAttendees(singleEvent.maxAttendees.toString());
    setlocation(singleEvent.location);
    setlatitude(singleEvent.latitude);
    setlongitude(singleEvent.longitude);
    setDescription(singleEvent.description);
    setAttendanceDate(singleEvent.attendanceDate);
    // ref.current.setAddressText(singleEvent.location);
  }, []);

  const nameHandler = (nameInput) => {
    setName(nameInput);
  };
  const maxAttendeesHandler = (maxAttendeesInput) => {
    setmaxAttendees(maxAttendeesInput);
  };
  const locationHandler = (locationInput) => {
    setlocation(locationInput);
    debouncedLocation(locationInput);
  };
  const descriptionHandler = (descriptionInput) => {
    setDescription(descriptionInput);
  };
  const attendanceDateHandler = (attendanceDateInput) => {
    setAttendanceDate(attendanceDateInput);
  };

  const DateChange = (date) => {
    const newdate = date.toISOString().slice(0, 10);

    setAttendanceDate(newdate);
  };

  const onChange = (selectedTime) => {
    // const newTime = selectedTime.toLocaleTimeString()
    // console.log("selected", newTime);

    setTime(selectedTime);
    hideDatePicker();
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const handleSubmit = () => {
    const obj = {
      name,
      maxAttendees: Number(maxAttendees),
      location,
      latitude,
      longitude,
      description,
      user,
      time: time.toLocaleTimeString(),
      attendanceDate,
    };
    dispatch(editEventThunk(singleEvent.id, obj, navigation));
    setName("");
    setmaxAttendees("");
    setlocation("");
    setlatitude("");
    setlongitude("");
    setDescription("");
    setAttendanceDate("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Event</Text>
      <View style={{ flex: 20 }}>
        <View style={styles.inputView}>
          <Fumi
            label={"Event Name"}
            iconClass={FontAwesomeIcon}
            iconName={"bullhorn"}
            iconColor={"#f95a25"}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={nameHandler}
            value={name}
          />
        </View>
        <View style={styles.inputView}>

          <Fumi
            label={"Max Attendees Count"}
            iconClass={FontAwesomeIcon}
            iconName={"users"}
            iconColor={"#f95a25"}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={maxAttendeesHandler}
            value={maxAttendees}
          />
        </View>
        <View
          style={
            places.length !== 0 ? { flex: 2.5, bottom: 10 } : styles.inputView
          }
        >
          <Fumi
            label={"Location"}
            iconClass={FontAwesomeIcon}
            iconName={"compass"}
            iconColor={"#f95a25"}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={locationHandler}
            value={location}
          />
          {places.length !== 0 && (
            <FlatList
              data={places}
              keyExtractor={(item) => item.place_id}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ height: 1, backgroundColor: "#DDDDDF" }} />
                );
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      setlocation(item.description);
                      dispatch(clearPlaces());
                      const location = await Location.geocodeAsync(
                        item.description
                      );
                      setlatitude(location[0].latitude);
                      setlongitude(location[0].longitude);
                    }}
                  >
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
        <View style={styles.inputView}>
          <Fumi
                label={"Event Description"}
                iconClass={FontAwesomeIcon}
                iconName={"address-card"}
                iconColor={"#f95a25"}
                iconSize={20}
                iconWidth={40}
                inputPadding={16}
            autoCapitalize="none"
            placeholder="Enter Description"
            style={styles.textInput}
            onChangeText={descriptionHandler}
            value={description}
          />
        </View>
        {/* <View style={styles.inputView}>
          <Text style={styles.inputHeader}>Event Type:</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={eventObjectTypeHandler}
            value={eventObjectType}
          />
        </View> */}
        <View style={styles.inputView}>
          <View style={styles.attendanceContainer}>
            <Fumi
          label={"Date"}
          iconClass={FontAwesomeIcon}
          iconName={"calendar"}
          iconColor={"#f95a25"}
          iconSize={20}
          iconWidth={40}
          inputPadding={16}
              placeholder={`${attendanceDate}`}
              editable={false}
              autoCapitalize="none"
              style={styles.attendanceTextInput}
              onChangeText={attendanceDateHandler}
              value={attendanceDate}
            />
            <TouchableOpacity
              style={styles.calenderButton}
              onPress={() => setCalModalVisible(true)}
            >
              <Image
                source={require("../../assets/calendar.png")}
                style={styles.calendarImage}
              />
            </TouchableOpacity>
          </View>
          {/* code below is for timer */}
          {/* <View style={styles.inputView}>
              <Text style={styles.inputHeader}>Time:</Text>
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            </View> */}
        </View>
        <View style={styles.inputView}>
          <View style={styles.attendanceContainer}>
            <Fumi
            label={"Time"}
            iconClass={FontAwesomeIcon}
            iconName={"history"}
            iconColor={"#f95a25"}
            iconSize={20}
            iconWidth={40}
            inputPadding={16}
              placeholder={`${time.toLocaleTimeString()}`}
              editable={false}
              autoCapitalize="none"
              style={styles.attendanceTextInput}
              value={time}
            />
            <TouchableOpacity
              style={styles.calenderButton}
              onPress={showDatePicker}
            >
              <Image
                source={require("../../assets/clock_icon.png")}
                style={styles.calendarImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={onChange}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={{ marginTop: 15 }}>
        <Button title="Edit Event" onPress={() => setModalVisible(true)} />
      </View>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={[styles.centeredView, { backgroundColor: "#DDDDDE" }]}>
            <View style={styles.modalView}>
              <Text style={{ textAlign: "center", paddingBottom: 5 }}>
                Are You Sure You Want to Edit This Event?
              </Text>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { height: 35, width: 100 },
                ]}
                onPress={() => {
                  dispatch(handleSubmit);
                }}
              >
                <Text style={{ textAlign: "center" }}>Confirm</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { height: 35, width: 100 },
                ]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={{ textAlign: "center" }}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={calModalVisible}
          onRequestClose={() => {
            setCalModalVisible(!calModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarPicker onDateChange={DateChange} />
              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { height: 35, width: 100 },
                ]}
                onPress={() => {
                  setCalModalVisible(!calModalVisible);
                }}
              >
                <Text style={{ textAlign: "center" }}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default EditEvent;
const width = Dimensions.get("window").width-25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    flexDirection: "column",
    alignItems: "center",
    margin: 15,
    marginBottom: 50,
  },
  header: {
    fontSize: 24,
    flex: 1,
  },
  inputHeader: {
    fontSize: 18,
    flex: 1,
    alignItems: "center",
  },
  textInput: {
    borderColor: "#CCCCCC",
    borderWidth: 2,
    borderRadius: 3,
    height: 40,
    fontSize: 15,
    margin: 5,
    width:width
  },
  inputView: {
    flex: 1,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  calendarImage: {
    width: 20,
    height: 20,
    resizeMode: "stretch",
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
  attendanceContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    position:'absolute',
    left:1
  },
  attendanceTextInput: {
    borderColor: "#CCCCCC",
    borderWidth: 2,
    borderRadius: 3,
    height: 40,
    fontSize: 15,
    margin: 5,
    width:width,
  },
  calenderButton: {
    right: 40,
    top: 20,
  },
});
