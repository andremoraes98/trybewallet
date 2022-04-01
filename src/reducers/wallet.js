import {
  START_REQUEST,
  SAVE_CURRENCY,
  SAVE_EXPENSE_INFO } from '../actions';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  totalValue: 0,
  expenseValue: 0,
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
      totalValue: state.totalValue + action.value,
      expenseValue: action.value,
    };
  default:
    return state;
  }
};

export default wallet;
