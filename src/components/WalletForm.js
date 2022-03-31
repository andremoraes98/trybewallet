import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpenseInfos, fetchEconomyJSONFromAPI } from '../actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valueInput: '',
      descriptionInput: '',
      currenciesInput: 'USD',
      methodInput: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addExpense = () => {
    const { saveInfosInExpenses, getEconomyInInstant, expenses } = this.props;
    getEconomyInInstant();
    saveInfosInExpenses(expenses.length, this.state);
  }

  render() {
    const {
      valueInput,
      descriptionInput,
      currenciesInput,
      methodInput,
      tag,
    } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            type="text"
            id="valueInput"
            name="valueInput"
            value={ valueInput }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>

        <label htmlFor="descriptionInput">
          Descrição:
          <input
            type="text"
            id="descriptionInput"
            name="descriptionInput"
            value={ descriptionInput }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currenciesInput">
          Moeda:
          <select
            name="currenciesInput"
            id="currenciesInput"
            value={ currenciesInput }
            onChange={ this.handleChange }
          >
            { currencies.map((currency, index) => (
              <option key={ index }>{currency}</option>
            ))}
          </select>
        </label>

        <label htmlFor="methodInput">
          Método de pagamento:
          <select
            name="methodInput"
            id="methodInput"
            value={ methodInput }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag da despesa:
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.addExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  saveInfosInExpenses: (
    id, expenseInfos, exchangeRates,
  ) => dispatch(saveExpenseInfos(id, expenseInfos, exchangeRates)),
  getEconomyInInstant: () => dispatch(fetchEconomyJSONFromAPI()),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  saveInfosInExpenses: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
