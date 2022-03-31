import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      emailInput: '',
      passwordInput: '',
      willRedirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  redirectToWallet = () => {
    const { saveEmailinStorage } = this.props;
    const { emailInput } = this.state;
    saveEmailinStorage(emailInput);
    this.setState({
      willRedirect: true,
    });
  }

  render() {
    const { emailInput, passwordInput, willRedirect } = this.state;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minCharacterPassword = 6;
    const disabledButton = true;

    return (
      willRedirect
        ? <Redirect to="/carteira" />
        : (
          <div>
            <input
              type="text"
              name="emailInput"
              placeholder="E-mail"
              value={ emailInput }
              onChange={ this.handleChange }
              data-testid="email-input"
            />

            <input
              type="password"
              name="passwordInput"
              value={ passwordInput }
              onChange={ this.handleChange }
              placeholder="Senha"
              data-testid="password-input"
            />

            <button
              type="button"
              disabled={
                passwordInput.length >= minCharacterPassword
                && emailRegex.test(emailInput)
                  ? !disabledButton
                  : disabledButton
              }
              onClick={ this.redirectToWallet }
            >
              Entrar
            </button>
          </div>
        )
    );
  }
}

Login.propTypes = {
  saveEmailinStorage: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmailinStorage: (user) => dispatch(saveEmail(user)),
});

export default connect(null, mapDispatchToProps)(Login);
