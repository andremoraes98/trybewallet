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
    const { getDataFromAPI, expenses } = this.props;
    getDataFromAPI(expenses);
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
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getDataFromAPI: (expense) => dispatch(fetchCurrencyJSONFromAPI(expense)),
});

Wallet.propTypes = {
  getDataFromAPI: Proptypes.func.isRequired,
  wantToEdit: Proptypes.bool.isRequired,
  expenses: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
