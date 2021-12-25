import { AnyAction } from 'redux';
import { Alert } from 'react-native';
import { Result } from '../components/Results';

export enum Actions {
  SEARCH = 'SEARCH',
  SEARCH_SUCCESS = 'SEARCH_SUCCESS',
  SEARCH_ERROR = 'SEARCH_ERROR',
}

export const search = (text: string): AnyAction => ({
  type: Actions.SEARCH,
  text,
});

export const searchSuccess = (results: Array<Result>, total: number): AnyAction => ({
  type: Actions.SEARCH_SUCCESS,
  results,
  total,
});

export const searchError = (): AnyAction => ({
  type: Actions.SEARCH_ERROR,
});

export const searchAsync = (text: string, start: number = 0) => {
  return async (dispatch: (action: AnyAction) => void) => {
    dispatch(search(text));
    try {
      const response = await fetch(`https://demo.dataverse.org/api/search?q=${text}&start=${start}`);
      const json = await response.json();
      dispatch(searchSuccess(json.data.items, json.data.total_count));
    } catch (error: any) {
      dispatch(searchError());
      Alert.alert('Oops!', error.message);
    }
  };
};
