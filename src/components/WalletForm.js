import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      valueInput: '',
      descriptionInput: '',

    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { valueInput, descriptionInput } = this.state;
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

        <label htmlFor="descriptionInput">
          Moeda:
          <select>
            { currencies.map((currency, index) => (
              <option key={ index }>{currency}</option>
            ))}
          </select>
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
