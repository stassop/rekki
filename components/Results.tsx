import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { State } from '../reducers';
import { asyncSearch } from '../actions';

export interface Result {
  name: string,
  type: string,
  url: string,
  identifier: string,
  published_at: string,
}

interface LinkProps {
  url: string,
  text: string,
}

const Link: React.FC<LinkProps> = ({ url, text }: LinkProps) => {
  const onPress = useCallback(async () => {
    const isUrlSupported = await Linking.canOpenURL(url);
    if (isUrlSupported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Oops!', `Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text numberOfLines={1} style={styles.link}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Item: React.FC<Result> = ({ name, type, url, published_at }: Result) => (
  <View style={styles.item}>
    <Text numberOfLines={1} style={styles.name}>{name}</Text>
    <Text>Type: {type}</Text>
    <Text>Published: {(new Date(published_at)).toLocaleString()}</Text>
    <Link url={url} text={url} />
  </View>
);

const Results: React.FC = () => {
  const dispatch = useDispatch();
  const text: string = useSelector((state: State) => state.text);
  const results: Array<Result> = useSelector((state: State) => state.results);
  const total: number = useSelector((state: State) => state.total);
  const isSearching: boolean = useSelector((state: State) => state.isSearching);

  const isEmpty = text.length > 0 && results.length === 0;

  const renderItem: ListRenderItem<Result> = ({ item }: {item: Result}) => (
    <Item { ...item } />
  );

  const getItemLayout = (item: any, index: number) => ({
    length: 80,
    offset: 80 * index,
    index,
  });

  const onEndReached = (): void => {
    if (results.length < total) {
      dispatch(asyncSearch(text, results.length));
    }
  };

  return (
    <>
      { isEmpty && !isSearching &&
        <Text style={styles.empty}>
          No results for '{text}'
        </Text>
      }
      { !isEmpty &&
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={item => item.identifier}
          getItemLayout={getItemLayout}
          onEndReached={onEndReached}
          style={styles.list}
        />
      }
      { isSearching && <ActivityIndicator /> }
    </>
  );
};

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  item: {
    height: 80,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
    color: 'blue',
  }
});

export default Results;
