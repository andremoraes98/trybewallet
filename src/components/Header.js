import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import crypto from '../images/crypto.png';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    const startValues = expenses
      .map((expense) => expense.value * Object.entries(expense.exchangeRates)
        .filter((currency) => currency[0] === expense.currency)[0][1].ask);
    const totalValue = startValues
      .reduce((acumulator, startValue) => acumulator + startValue, 0);
    return (
      <header>
        <img src={ crypto } alt="Crypto Wallet" />
        <div className="userInfos">
          <p>
            Email:
            <span data-testid="email-field">{userEmail}</span>
          </p>

          <p data-testid="total-field">
            { totalValue }
          </p>

          <p data-testid="header-currency-field">
            BRL
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
