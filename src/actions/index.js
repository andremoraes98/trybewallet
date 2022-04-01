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

export const saveExpenseInfos = (id, expenseInfos, exchangeRates) => {
  const valueCurrencyInBRL = Object.entries(exchangeRates)
    .filter((currency) => currency[0] === expenseInfos.currency);
  console.log();
  return ({
    type: SAVE_EXPENSE_INFO,
    expenseInfos: {
      id,
      ...expenseInfos,
      exchangeRates,
    },
    value: (
      Number.isNaN(parseFloat(expenseInfos.value))
        ? 0
        : parseFloat(parseFloat(expenseInfos.value) * (valueCurrencyInBRL[0][1].ask))
    ),
  });
};

export const fetchEconomyJSONFromAPI = (id, expenseInfos) => async (dispatch) => {
  dispatch(requestJSON());
  const response = await fetch(URL_ECONOMIA);
  const data = await response.json();
  return dispatch(saveExpenseInfos(id, expenseInfos, data));
};
