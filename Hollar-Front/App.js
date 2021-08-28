import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';
import store from "./store"
import { NavigationContainer } from '@react-navigation/native';


class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store} >
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </Provider>
      </>
    );
  }
}

export default App
