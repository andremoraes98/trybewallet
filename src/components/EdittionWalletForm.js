import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeExpense } from '../actions';

const ALIMENTAÇÃO = 'Alimentação';

class WalletForm extends Component {
  constructor(props) {
    super(props);

    const { selectedEditExpense } = this.props;

    this.state = selectedEditExpense;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  addExpense = (expenseId) => {
    const { changeExpenseInfo } = this.props;
    changeExpenseInfo(expenseId, this.state);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: ALIMENTAÇÃO,
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            type="text"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="description-input"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            { currencies.map((eachCurrency, index) => (
              <option key={ index }>{eachCurrency}</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            name="method"
            id="method"
            value={ method }
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
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  selectedEditExpense: state.wallet.selectedExpense,
});

const mapDispatchToProps = (dispatch) => ({
  changeExpenseInfo: (
    id, expenseInfos,
  ) => dispatch(changeExpense(id, expenseInfos)),
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeExpenseInfo: PropTypes.func.isRequired,
  selectedEditExpense: PropTypes.shape({
    currency: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
    id: PropTypes.number,
    method: PropTypes.string,
    tag: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
