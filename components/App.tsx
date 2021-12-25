import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Search from './Search';
import Results from './Results';
import { rootReducer } from '../reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

const App: React.FC = () => {
  const isDarkMode: boolean = useColorScheme() === 'dark';
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
