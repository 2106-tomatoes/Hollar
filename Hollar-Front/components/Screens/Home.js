import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';


const Home =(props)=>{
    const history = props.history
    return(
        <View style={styles.container}>
            <Text>Home Page</Text>
            <Button title="Test Change" onPress={()=> history.push("/test") } />
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