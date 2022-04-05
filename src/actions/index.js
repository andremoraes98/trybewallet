export const SAVE_EMAIL = 'SAVE_EMAIL';
export const START_REQUEST = 'START_REQUEST';
export const SAVE_CURRENCY = 'SAVE_CURRENCY';
export const SAVE_ECONOMY_CURRENCY = 'SAVE_ECONOMY_CURRENCY';
export const SAVE_EXPENSE_INFO = 'SAVE_EXPENSE_INFO';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';
const URL_ECONOMIA = 'https://economia.awesomeapi.com.br/json/all';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const requestJSON = () => ({
  type: START_REQUEST,
});

export const getInitialsOfCurrency = (currencies, expenses) => {
  const startValues = expenses
    .map((expense) => expense.value * Object.entries(expense.exchangeRates)
      .filter((currency) => currency[0] === expense.currency)[0][1].ask);
  const totalValue = startValues
    .reduce((acumulator, startValue) => acumulator + startValue, 0);
  return {
    type: SAVE_CURRENCY,
    currencies,
    expenses,
    totalValue,
  };
};

export const deleteExpense = (expenseId, expenseValue) => ({
  type: DELETE_EXPENSE,
  expenseId,
  expenseValue: parseFloat(expenseValue),
});

export const editExpense = (expenseId) => ({
  type: EDIT_EXPENSE,
  expenseId,
});

export const fetchCurrencyJSONFromAPI = (expenses) => async (dispatch) => {
  dispatch(requestJSON());
  const response = await fetch(URL_ECONOMIA);
  const data = await response.json();
  const dataWithOutUSDT = Object.keys(data).filter((currency) => currency !== 'USDT');
  return dispatch(getInitialsOfCurrency(dataWithOutUSDT, expenses));
};

export const saveExpenseInfos = (id, expenseInfos, exchangeRates) => {
  const valueCurrencyInBRL = Object.entries(exchangeRates)
    .filter((currency) => currency[0] === expenseInfos.currency);
  return ({
    type: SAVE_EXPENSE_INFO,
    expenseInfos: {
      id,
      ...expenseInfos,
      exchangeRates,
    },
    value: expenseInfos.value * (valueCurrencyInBRL[0][1].ask),
  });
};

export const fetchEconomyJSONFromAPI = (id, expenseInfos) => async (dispatch) => {
  dispatch(requestJSON());
  const response = await fetch(URL_ECONOMIA);
  const data = await response.json();
  return dispatch(saveExpenseInfos(id, expenseInfos, data));
};

export const changeExpense = (editedExpense) => ({
  type: CHANGE_EXPENSE,
  editedExpense,
});
