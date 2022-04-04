import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import crypto from '../images/crypto.png';

class Header extends Component {
  render() {
    const { userEmail, totalValue } = this.props;
    const noNullTotalValue = totalValue || 0;
    return (
      <header>
        <img src={ crypto } alt="Crypto Wallet" />
        <div className="userInfos">
          <p>
            Email:
            <span data-testid="email-field">{userEmail}</span>
          </p>

          <p data-testid="total-field">
            { noNullTotalValue }
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
  totalValue: state.wallet.totalValue,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
