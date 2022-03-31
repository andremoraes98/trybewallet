export const SAVE_EMAIL = 'SAVE_EMAIL';
export const START_REQUEST = 'START_REQUEST';
export const SAVE_CURRENCY = 'SAVE_CURRENCY';
export const SAVE_ECONOMY_CURRENCY = 'SAVE_ECONOMY_CURRENCY';
export const SAVE_EXPENSE_INFO = 'SAVE_EXPENSE_INFO';
const URL_ECONOMIA = 'https://economia.awesomeapi.com.br/json/all';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const requestJSON = () => ({
  type: START_REQUEST,
});

export const getInitialsOfCurrency = (currencies) => ({
  type: SAVE_CURRENCY,
  currencies,
});

export const fetchCurrencyJSONFromAPI = () => async (dispatch) => {
  dispatch(requestJSON());
  const response = await fetch(URL_ECONOMIA);
  const data = await response.json();
  const dataWithOutUSDT = Object.keys(data).filter((currency) => currency !== 'USDT');
  return dispatch(getInitialsOfCurrency(dataWithOutUSDT));
};

export const saveExpenseInfos = (id, expenseInfos, exchangeRates) => ({
  type: SAVE_EXPENSE_INFO,
  expenseInfos: { id, ...expenseInfos, ...exchangeRates },
});

export const getEconomiesOfCurrency = (economy) => ({
  type: SAVE_ECONOMY_CURRENCY,
  economy,
});

export const fetchEconomyJSONFromAPI = () => async (dispatch) => {
  dispatch(requestJSON());
  const response = await fetch(URL_ECONOMIA);
  const data = await response.json();
  const dataWithOutUSDT = Object.entries(data)
    .filter((currency) => currency[0] !== 'USDT');
  return dispatch(getEconomiesOfCurrency(dataWithOutUSDT));
};
