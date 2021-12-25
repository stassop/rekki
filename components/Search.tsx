import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  search as searchAction,
  searchSuccess,
  searchError,
} from '../actions';

const Search = () => {
  const [ text, setText ] = useState<string>('');
  const dispatch = useDispatch();

  const search = async () => {
    try {
      dispatch(searchAction(text));
      const response = await fetch('https://demo.dataverse.org/api/search?q=' + text);
      const json = await response.json();
      dispatch(searchSuccess(json.data.items));
    } catch (error: any) {
      dispatch(searchError());
      Alert.alert('Oops!', error?.message || 'Something went wrong');
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        autoFocus={true}
        onChangeText={setText}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={search}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    flex: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  button: {
    backgroundColor: 'black',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Search;
