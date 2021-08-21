import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { changeCount } from "../store/count";

class Main extends React.Component {
  constructor() {
    super()
    this.decrementCount = this.decrementCount.bind(this)
    this.incrementCount = this.incrementCount.bind(this)
  }
  decrementCount() {
    let { count, actions } = this.props;
    count--;
    actions(count);
  }
  incrementCount() {
    let { count, actions } = this.props;
    count++;
    actions(count);
  }
  render() {
    const { count } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Button
            title="increment"
            onPress={() => this.incrementCount()}
          />
        </View>
        <View>
          <Text>
              {count}
          </Text>
        </View>
        <View>
          <Button
            title="decrement"
            onPress={() => this.decrementCount()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const mapStateToProps = state => {
  return {
    count: state.count,
  }
};


const mapDispatchToProps = dispatch => {
  return {
    actions: (count) => dispatch(changeCount(count))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Main)
