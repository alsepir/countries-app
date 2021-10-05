import { IReduxAction } from '../types'
import { ICountryModel } from '../types'

interface ICountries {
  [key: string]: ICountryModel[];
}

interface CountriesState {
  readonly fetching: boolean;
  readonly countries: ICountries;
}

const initialState: CountriesState = {
  fetching: false,
  countries: {},
};

type CountriesAction =
  | IReduxAction<typeof REQUEST_REGION>
  | IReduxAction<typeof REQUEST_REGION_SUCCESS, ICountries>
  | IReduxAction<typeof REQUEST_REGION_ERROR>;

// types
export const REQUEST_REGION = 'REQUEST_REGION';
const REQUEST_REGION_SUCCESS = 'REQUEST_REGION_SUCCESS';
const REQUEST_REGION_ERROR = 'REQUEST_REGION_ERROR';

// actions
export const requestRegionAction = () => ({ type: REQUEST_REGION, });
export const requestRegionSuccessAction = (payload: ICountries) => ({ type: REQUEST_REGION_SUCCESS, payload });
export const requestRegionErrorAction = () => ({ type: REQUEST_REGION_ERROR, });

// reducer
const countriesReducer = (state = initialState, action: CountriesAction): CountriesState => {
  switch (action.type) {
    case REQUEST_REGION:
      return { ...state, fetching: true };
    case REQUEST_REGION_SUCCESS:
      return { ...state, fetching: false, countries: action.payload! };
    case REQUEST_REGION_ERROR:
      return { ...state, fetching: false };
    default:
      return state;
  }
}

export default countriesReducer;