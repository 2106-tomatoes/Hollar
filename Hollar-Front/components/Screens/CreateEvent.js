import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { createEventThunk } from '../../store/event';

const CreateEvent = (props) => {

    const dispatch = useDispatch();
    const history = props.history;
    const user = useSelector(state => state.user)

    const [name, setName] = useState("");
    const [maxAttendees, setmaxAttendees] = useState("");
    const [location, setlocation] = useState("");
    const [description, setDescription] = useState("");
    const [eventObjectType, setEventObjectType] = useState("");


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
    const eventObjectTypeHandler = (eventObjectTypeInput) => {
      setEventObjectType(eventObjectTypeInput);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        dispatch(
          createEventThunk(
            name,
            maxAttendees,
            location,
            description,
            eventObjectType,
            user,
            history
          )
        );
      };

    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        <Text>Name:</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={nameHandler}
          value={name}
        />
        <Text>Max Attendees Count:</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={maxAttendeesHandler}
          value={maxAttendees}
        />
        <Text>Location:</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={locationHandler}
          value={location}
        />
        <Text>Description:</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={descriptionHandler}
          value={description}
        />
        <Text>Event Type:</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={eventObjectTypeHandler}
          value={eventObjectType}
        />
        <Button title="Create Event" onPress={handleSubmit} />
      </View>
    );
  };



export default CreateEvent

const styles = StyleSheet.create({})
