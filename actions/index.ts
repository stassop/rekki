import { Alert } from 'react-native';
import { Action, ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { State } from '../reducers';
import { Result } from '../components/Results';

export enum Actions {
  SEARCH = 'SEARCH',
  SEARCH_SUCCESS = 'SEARCH_SUCCESS',
  SEARCH_ERROR = 'SEARCH_ERROR',
}

// Action types

interface SearchAction extends Action {
  type: Actions.SEARCH,
  text: string,
}

interface SearchSuccessAction extends Action {
  type: Actions.SEARCH_SUCCESS,
  results: Array<Result>,
  total: number,
}

interface SearchErrorAction extends Action {
  type: Actions.SEARCH_ERROR,
}

export type ActionType = SearchAction | SearchSuccessAction | SearchErrorAction;

type AsyncSearchAction = ThunkAction<Promise<void>, State, unknown, ActionType>;

type AsyncSearchDispatch = ThunkDispatch<State, unknown, ActionType>;

// Action creators

export const search: ActionCreator<SearchAction> = (text: string): SearchAction => ({
  type: Actions.SEARCH,
  text,
});

export const searchSuccess: ActionCreator<SearchSuccessAction> = (results: Array<Result>, total: number): SearchSuccessAction => ({
  type: Actions.SEARCH_SUCCESS,
  results,
  total,
});

export const searchError: ActionCreator<SearchErrorAction> = (): SearchErrorAction => ({
  type: Actions.SEARCH_ERROR,
});

export const asyncSearch: ActionCreator<AsyncSearchAction> = (text: string, start: number = 0): AsyncSearchAction => {
  return async (dispatch: AsyncSearchDispatch): Promise<void> => {
    dispatch(search(text));
    try {
      const response = await fetch(`https://demo.dataverse.org/api/search?q=${text}&start=${start}`);
      const json = await response.json();
      dispatch(searchSuccess(json.data.items, json.data.total_count));
    } catch (error: unknown) {
      dispatch(searchError());
      const errorMessage = (error as Error).message;
      Alert.alert('Oops!', errorMessage);
    }
  };
};
