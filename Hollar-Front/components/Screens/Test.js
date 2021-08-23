import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';


const Test =(props)=>{
    const history = props.history
    return(
        <View style={styles.container}>
            <Text>Test Page</Text>
            <Button title="Test Home" onPress={()=> history.push("/") } />
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

export default Test