import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { fetchCurrencyJSONFromAPI } from '../actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { getDataFromAPI } = this.props;
    getDataFromAPI();
  }

  render() {
    return (
      <>
        <Header />
        <WalletForm />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getDataFromAPI: () => dispatch(fetchCurrencyJSONFromAPI()),
});

Wallet.propTypes = {
  getDataFromAPI: Proptypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
