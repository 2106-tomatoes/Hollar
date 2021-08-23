import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';


const Home =(props)=>{
    const history = props.history
    function _onPressButton() {
      alert('You tapped the button!')
    }
    
    return(
        <View style={styles.container}>
          <TouchableHighlight onPress={()=>history.push("/chatroom")} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>Chatroom Title</Text>
          </View>
        </TouchableHighlight>
        <Button title="Logout" onPress={()=> history.push("/") } />
           
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center"
    }
    
  });

export default Home