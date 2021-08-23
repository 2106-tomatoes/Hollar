import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import {io} from "socket.io-client"
import IP from "../env"
import {getCurrentChat} from "../../store/chatroom"


const Chatroom =(props)=>{
    const history = props.history
    const getChat = props.getChat

    useEffect(()=>{
        const socket = props.socket
        getChat()
        socket.on('recieved', function(){
            console.log('server got the message!')})
    }, []);
    console.log('chatroom props>', props)
    
    return(

        <View style={styles.container}>
        <Text>Chatroom</Text>
   
        <Button title="Back Home" onPress={()=> history.push("/home") } />
           
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

  const mapStateToProps = state => {
  
    return {
        message:state.chatroom.messages
     }
  };
  
  
  const mapDispatchToProps = dispatch => {
    return {
        getChat: () => dispatch(getCurrentChat())
     }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chatroom)
  