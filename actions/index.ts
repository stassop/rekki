import { AnyAction } from 'redux';
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

export const searchSuccess = (results: Array<Result>): AnyAction => ({
  type: Actions.SEARCH_SUCCESS,
  results,
});

export const searchError = (): AnyAction => ({
  type: Actions.SEARCH_ERROR,
});
