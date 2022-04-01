import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, totalValue } = this.props;
    return (
      <header>
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
