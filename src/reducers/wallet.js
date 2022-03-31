import { START_REQUEST, SAVE_CURRENCY } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

const wallet = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case START_REQUEST:
    return {
      ...state,
      isFetching: true,
    };
  case SAVE_CURRENCY:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default wallet;
