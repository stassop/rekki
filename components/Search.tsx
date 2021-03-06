import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { State } from '../reducers';
import { asyncSearch } from '../actions';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [ text, setText ] = useState('');
  const prevText: string = useSelector((state: State) => state.text);

  const sanitize = (dirty: string): string => dirty.trim().replace(/\s{2,}/g, ' ');

  const search = (): void => {
    const cleanText: string = sanitize(text);
    if (cleanText !== prevText) {
      dispatch(asyncSearch(cleanText));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        autoFocus={true}
        onChangeText={setText}
        placeholder={'Search Dataverse'}
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
