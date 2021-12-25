import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Search from './Search';
import Results from './Results';
import { rootReducer } from '../reducers';

const store = createStore(rootReducer);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Search />
        <Results />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
