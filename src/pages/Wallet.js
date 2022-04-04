import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { fetchCurrencyJSONFromAPI } from '../actions';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EdittionWalletForm from '../components/EdittionWalletForm';

class Wallet extends React.Component {
  componentDidMount() {
    const { getDataFromAPI } = this.props;
    getDataFromAPI();
  }

  render() {
    const { wantToEdit } = this.props;
    return (
      <>
        <Header />
        { wantToEdit ? <EdittionWalletForm /> : <WalletForm /> }
        <Table />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  wantToEdit: state.wallet.wantToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  getDataFromAPI: () => dispatch(fetchCurrencyJSONFromAPI()),
});

Wallet.propTypes = {
  getDataFromAPI: Proptypes.func.isRequired,
  wantToEdit: Proptypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
