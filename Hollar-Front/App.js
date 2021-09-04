import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';
import store from "./store"
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
// import { default as theme } from './ui_theme/custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';


class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store} >
          <NavigationContainer>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
              <Main />
            </ApplicationProvider>
          </NavigationContainer>
        </Provider>
      </>
    );
  }
}

export default App
