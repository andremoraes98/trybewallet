import {
  START_REQUEST,
  SAVE_CURRENCY,
  SAVE_EXPENSE_INFO,
  SAVE_ECONOMY_CURRENCY } from '../actions';

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
  case SAVE_EXPENSE_INFO:
    return {
      ...state,
      expenses: [...state.expenses, action.expenseInfos],
    };
  case SAVE_ECONOMY_CURRENCY:
    return {
      ...state,
      exchangeRates: action.exchangeRates,
    };
  default:
    return state;
  }
};

export default wallet;
