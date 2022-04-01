import {
  START_REQUEST,
  SAVE_CURRENCY,
  SAVE_EXPENSE_INFO,
  DELETE_EXPENSE } from '../actions';

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
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenseId),
      totalValue: state.totalValue - state.expenses
        .filter((expense) => expense.id !== action.expenseId).value,
    };
  default:
    return state;
  }
};

export default wallet;
