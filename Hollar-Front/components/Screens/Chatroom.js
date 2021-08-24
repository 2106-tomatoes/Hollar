import React, {useState , useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import {io} from "socket.io-client"
import IP from "../env"
import {getChatThunk} from "../../store/chatroom"


const Chatroom =(props)=>{
  // const history = props.history
  // const getChat = props.getChat
  // const socket = props.socket

  const { history, getChat, socket} = props;

  const [msg, setMsg] = useState('');
  const [res, setRes] = useState('');

  useEffect(()=>{
    // const socket = props.socket
    // getChat()
    // socket.emit('testSocket', 'from testSocket');
    // socket.on('recieved', function(){
    //   console.log('server got the message!')
    // })
  }, []);
  
  function submitChatMsg() {
    // console.log('sendMsgToServer, msg:', msg);
    socket.emit('testSocket', msg);
    socket.on('recieved', function(res){
      console.log('server received:', res);
      setRes(res);
    })
  }

  return(
    <View style={styles.container}>
      <Text>Chatroom</Text>
      <View style={{padding: 10}}>
        <TextInput
          style={styles.input}
          placeholder="Your msg"
          onChangeText={msg => setMsg(msg)}
          onSubmitEditing={() => submitChatMsg()}
          defaultValue={msg}
        />
      </View>
      <View style={{padding: 10}}>
        <TextInput
          style={styles.input}
          placeholder="Res from server"
          // onChangeText={msg => setMsg(msg)}
          // defaultValue={res}
          defaultValue={res}
        />
      </View>
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
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    
  });

  const mapStateToProps = state => {
  
    return {
        message:state.chatroom.messages
     }
  };
  
  
  const mapDispatchToProps = dispatch => {
    return {
        getChat: () => dispatch(getChatThunk())
     }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Chatroom)
  