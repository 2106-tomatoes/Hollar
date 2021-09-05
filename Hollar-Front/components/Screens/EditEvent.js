import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { editEventThunk } from "../../store/SingleEvent";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import CalendarPicker from "react-native-calendar-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const EditEvent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const singleEvent = props.route.params.singleEvent;
  const ref = useRef();
  const currentDate = new Date();

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

  useEffect(() => {
    setName(singleEvent.name);
    setmaxAttendees(singleEvent.maxAttendees.toString());
    setlocation(singleEvent.location);
    setlatitude(singleEvent.latitude);
    setlongitude(singleEvent.longitude);
    setDescription(singleEvent.description);
    setAttendanceDate(singleEvent.attendanceDate);
    ref.current.setAddressText(singleEvent.location);
  }, []);

  const nameHandler = (nameInput) => {
    setName(nameInput);
  };
  const maxAttendeesHandler = (maxAttendeesInput) => {
    setmaxAttendees(maxAttendeesInput);
  };
  const locationHandler = (locationInput) => {
    setlocation(locationInput);
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
          <Text style={styles.inputHeader}>Name:</Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Name of Event"
            style={styles.textInput}
            onChangeText={nameHandler}
            value={name}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputHeader}>Max Attendees Count:</Text>
          <TextInput
            placeholder="Enter Max Attendees"
            autoCapitalize="none"
            placeholder="Maximum Attendees"
            style={styles.textInput}
            onChangeText={maxAttendeesHandler}
            value={maxAttendees}
          />
        </View>
        {/* <View style={styles.inputView}>
          <Text style={styles.inputHeader}>Location:</Text>
          <TextInput
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={locationHandler}
            value={location}
          />
        </View> */}
        <View style={styles.inputView}>
          <Text>Location:</Text>
          <GooglePlacesAutocomplete
            ref={ref}
            placeholder="Enter Location"
            styles={styles.textInput}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={500}
            enablePoweredByContainer={false}
            fetchDetails={true}
            minLength={2}
            returnKeyType={"search"}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              console.log(
                "details.geometry.location",
                details.geometry.location
              );
              setlatitude(details.geometry.location.lat);
              setlongitude(details.geometry.location.lng);
              console.log("data.description", data.description);
              setlocation(data.description);
            }}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.inputHeader}>Description:</Text>
          <TextInput
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
          <Text style={styles.inputHeader}>Attendance Date:</Text>
          <View style={styles.attendanceContainer}>
            <TextInput
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
          <Text style={styles.inputHeader}>Time:</Text>
          <View style={styles.attendanceContainer}>
            <TextInput
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
    flex: 1,
    backgroundColor: "#DDDDDE",
    borderRadius: 9999,
    height: 37,
    width: 300,
    margin: 12,
    paddingHorizontal: 20,
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
  },
  attendanceTextInput: {
    backgroundColor: "#DDDDDE",
    borderRadius: 9999,
    height: 37,
    width: 300,
    margin: 12,
    paddingHorizontal: 20,
  },
  calenderButton: {
    right: 40,
    top: 20,
  },
});
