import { Reducer, AnyAction } from 'redux';
import { Actions } from '../actions';
import { Result } from '../components/Results';

export interface State {
  text: string,
  results: Array<Result>,
  isSearching: boolean,
  total: number,
}

const initialState: State = {
  text: '',
  results: [],
  isSearching: false,
  total: 0,
};

export const rootReducer: Reducer<State, AnyAction> = (
  state: State = initialState,
  action: AnyAction,
): State => {
  switch (action.type) {
    case Actions.SEARCH:
      return {
        ...state,
        text: action.text,
        isSearching: true,
        results: action.text === state.text ? state.results : [],
      };
    case Actions.SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        results: [...state.results, ...action.results],
        total: action.total,
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
