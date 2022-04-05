import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import crypto from '../images/crypto.png';

class Header extends Component {
  render() {
    const { userEmail, expenses } = this.props;
    const totalValue = expenses
      .reduce((acumulator, expense) => acumulator + (expense.value * expense
        .exchangeRates[expense.currency].ask), 0);
    return (
      <header>
        <img src={ crypto } alt="Crypto Wallet" />
        <div className="userInfos">
          <span>
            Email:
            <span data-testid="email-field">{userEmail}</span>
          </span>

          <div>
            <span data-testid="total-field">
              { totalValue.toFixed(2) }
            </span>

            <span data-testid="header-currency-field">
              BRL
            </span>
          </div>
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
