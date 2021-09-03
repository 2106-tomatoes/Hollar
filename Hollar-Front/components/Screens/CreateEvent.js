import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Pressable
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createEventThunk } from "../../store/event";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import CalendarPicker from "react-native-calendar-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateEvent = (props) => {
  const dispatch = useDispatch();

  const currentDate = new Date();
  const newCurrentdDate = currentDate.toISOString().slice(0, 10);
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();


  const [name, setName] = useState("");
  const [maxAttendees, setmaxAttendees] = useState("");
  const [location, setlocation] = useState("");
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [description, setDescription] = useState("");
  const [attendanceDate, setAttendanceDate] = useState(`${newCurrentdDate}`);
  const [modalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(currentDate);

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
  const hourHandler = (hourInput) => {
    setTime(hourInput);
  };

  
  const DateChange = (date) => {
    const newdate = date.toISOString().slice(0, 10);

    setAttendanceDate(newdate);
  };

  const onChange = (event, selectedTime) => {
    console.log("selected", selectedTime.toLocaleTimeString());
    
    setTime(selectedTime)

  };
  console.log('react time', time)
  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(
      createEventThunk(
        name,
        maxAttendees,
        location,
        latitude,
        longitude,
        description,
        user,
        attendanceDate,
        navigation
      )
    );
    setName("");
    setmaxAttendees("");
    setlocation("");
    setlatitude("");
    setlongitude("");
    setDescription("");
    setAttendanceDate(`${newCurrentdDate}`);
  };

  return (
      <View style={styles.container}>
          <Text style={styles.header}>Create Event</Text>
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
                  onPress={() => setModalVisible(true)}
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
                  <CalendarPicker onDateChange={DateChange} />
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
                    <Text style={{ textAlign: "center" }}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>

          <View style={{ marginTop: 15 }}>
            <Button title="Create Event" onPress={handleSubmit} />
          </View>
      </View>
    
  );
};

export default CreateEvent;

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
