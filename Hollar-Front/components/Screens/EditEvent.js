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
  Pressable
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {editEventThunk} from "../../store/SingleEvent"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";


const EditEvent = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();
  const singleEvent = props.route.params.singleEvent;
  const ref = useRef()
  

  const [name, setName] = useState("");
  const [maxAttendees, setmaxAttendees] = useState("");
  const [location, setlocation] = useState("");
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [description, setDescription] = useState("");
  const [attendanceDate, setAttendanceDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  
  console.log(`singleEvent`, singleEvent)
  useEffect(()=> {
    setName(singleEvent.name)
    setmaxAttendees(singleEvent.maxAttendees.toString())
    setlocation(singleEvent.location)
    setlatitude(singleEvent.latitude)
    setlongitude(singleEvent.longitude)
    setDescription(singleEvent.description)
    setAttendanceDate(singleEvent.attendanceDate)
    ref.current.setAddressText(singleEvent.location)
  }, [])


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

  const handleSubmit = () => {

    const obj = {
        name,
        maxAttendees:Number(maxAttendees),
        location,
        latitude,
        longitude,
        description,
        user,
        attendanceDate,
    }
    dispatch(
      editEventThunk(singleEvent.id,
        obj,navigation
      )
    );
    setName("");
    setmaxAttendees("");
    setlocation("");
    setlatitude("")
    setlongitude("")
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
                    console.log("details.geometry.location", details.geometry.location)
                    setlatitude(details.geometry.location.lat)
                    setlongitude(details.geometry.location.lng)
                    console.log("data.description", data.description)
                    setlocation(data.description)
                  }
              }
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
          <TextInput
            placeholder="YYYY-MM-DD  e.g. 2021-09-04"
            autoCapitalize="none"
            style={styles.textInput}
            onChangeText={attendanceDateHandler}
            value={attendanceDate}
          />
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        <Button title="Edit Event" onPress={()=>setModalVisible(true)} />
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
          <View style={[styles.centeredView, {backgroundColor: '#DDDDDE'}]}>
            <View style={styles.modalView}>
            <Text style={{textAlign:'center', paddingBottom:5}}>Are You Sure You Want to Edit This Event?</Text>
            <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  { height: 35, width: 100 },
                ]}
                onPress={() => {
                  dispatch(handleSubmit)
                
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
       </View>
    </View>
  );
};

export default EditEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
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
    height: 600,
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
  buttonContainer: {
    margin: 10,
  },
  objectContainer: {
    flexDirection: "row",
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
});
