import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, editExpense } from '../actions';

class Expenses extends Component {
  render() {
    const { expenses, dispatchDeleteExpense, dispatchEditExpense } = this.props;
    return (
      <tbody>
        { expenses.map((expense, index) => {
          const twoDecimalDigitsValue = parseFloat(expense.value).toFixed(2);
          const currencyArray = Object
            .entries(expense.exchangeRates)
            .filter((currency) => currency[0] === expense.currency);
          const currencyName = currencyArray[0][1].name;
          const currencyChange = parseFloat(currencyArray[0][1].ask).toFixed(2);
          const twoDecimalDigitsConvertedValue = (expense.value * currencyArray[0][1].ask)
            .toFixed(2);
          return (
            <tr key={ index }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{twoDecimalDigitsValue}</td>
              <td>{currencyName}</td>
              <td>{currencyChange}</td>
              <td>{twoDecimalDigitsConvertedValue}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => dispatchEditExpense(expense.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => dispatchDeleteExpense(expense.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        }) }
      </tbody>);
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteExpense: (expense) => dispatch(deleteExpense(expense)),
  dispatchEditExpense: (expense) => dispatch(editExpense(expense)),
});

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchDeleteExpense: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
