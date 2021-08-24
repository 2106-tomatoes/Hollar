import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import {getChatListThunk} from '../../store/chatroom';


const Home =(props)=>{
    const history = props.history

    
    useEffect(()=>{
      props.getChatList(1);
  }, []);

    return(
        <View style={styles.container}>
          <TouchableHighlight onPress={()=>history.push("/chatroom/1")} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>A Chatroom Title</Text>
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

  const mapStateToProps = state => {
    return {
        messageList:state.chatList
     }
  }; 
  const mapDispatchToProps = dispatch => {
    return {
        getChatList: (userId) => dispatch(getChatListThunk(userId))
     }
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)