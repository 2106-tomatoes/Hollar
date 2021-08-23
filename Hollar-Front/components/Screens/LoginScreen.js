import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';


const Login =(props)=>{
    const history = props.history
    return(
        <View style={styles.container}>
            <Text>Login Page</Text>
            <Button title="Go To Channels" onPress={()=> history.push("/home") } />
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

export default Login