import { Reducer, AnyAction } from 'redux';
import { Actions } from '../actions';
import { Result } from '../components/Results';

export interface State {
  text: string,
  isSearching: boolean,
  results: Array<Result>,
}

const initialState: State = {
  text: '',
  isSearching: false,
  results: [],
};

export const rootReducer: Reducer<State, AnyAction> = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case Actions.SEARCH:
      return {
        ...state,
        text: action.text,
        isSearching: true,
      };
    case Actions.SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        results: action.results,
      };
    case Actions.SEARCH_ERROR:
      return {
        ...state,
        isSearching: false,
      };
    default:
      return state;
  }
};
