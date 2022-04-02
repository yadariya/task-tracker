import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginInputStyled } from '../Form/Input';
import { LoginButtonStyled } from '../Form/Button';
import { CenteredColumn } from '../Layout/CenteredColumn.styled';
import LoginFormHeading from '../Typography/LoginFormHeading';
import LoginFormFootnote from '../Typography/LoginFormFootnote';
import { store } from '../../store/store';
import { logIn } from '../../data/slices/authenticationSlice';
import LoginFormErrorStyled from '../Typography/LoginFormError';

interface RegistrationResult {
  detail: string | undefined;
  access_token: string | undefined;
}

interface RegisterFormState {
  username: string;
  email: string;
  password: string;
  confirmation: string;
  error: string;
}

class RegisterForm extends React.Component<{}, RegisterFormState> {
  confirmationRef: RefObject<HTMLInputElement>;

  repeatPasswordRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmation: '',
      error: '',
    };
    this.confirmationRef = React.createRef();
    this.repeatPasswordRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.askConfirmation = this.askConfirmation.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const name = target.name as 'username' | 'email' | 'password' | 'confirmation';
    if (!name) {
      return;
    }

    this.setState({
      [name]: target.value,
    } as Pick<RegisterFormState, keyof RegisterFormState>);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const repeatPasswordField = this.repeatPasswordRef.current;
    if (repeatPasswordField != null && repeatPasswordField?.value != this.state.password) {
      repeatPasswordField.focus();
      this.setState({
        error: "Passwords don't match",
      });
      return;
    }

    if (!this.state.confirmation) {
      fetch(`${process.env.API_ROOT}/users/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: this.state.email }),
      }).then(this.askConfirmation);
      return;
    }

    fetch(`${process.env.API_ROOT}/users/new/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        confirm_token: this.state.confirmation,
        username: this.state.username,
        password: this.state.password,
        role: '',
      }),
    })
      .then((response) => response.json())
      .then((auth) => this.handleRegistration(auth));
  }

  askConfirmation() {
    if (this.confirmationRef.current == null) {
      return;
    }

    this.confirmationRef.current.disabled = false;
    this.confirmationRef.current.focus();
  }

  handleRegistration(auth: RegistrationResult) {
    if (auth.access_token) {
      store.dispatch(logIn(auth.access_token));
      return;
    }

    this.setState({
      error: auth.detail || '',
    });
  }

  render() {
    if (store.getState().authentication.accessToken !== null) {
      return <Navigate to="/" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <CenteredColumn gap="1em">
          <LoginFormHeading>Sign Up</LoginFormHeading>
          <CenteredColumn gap="0.25em">
            <LoginInputStyled
              onChange={this.handleChange}
              placeholder="Email"
              type="email"
              pattern=".+@.+\..+"
              name="email"
            />
            <LoginInputStyled
              onChange={this.handleChange}
              placeholder="Username"
              pattern="[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]"
              name="username"
            />
            <LoginInputStyled
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              name="password"
            />
            <LoginInputStyled
              placeholder="Repeat password"
              ref={this.repeatPasswordRef}
              type="password"
            />
            <LoginInputStyled
              onChange={this.handleChange}
              placeholder="Confirmation token"
              ref={this.confirmationRef}
              type="text"
              name="confirmation"
              disabled
            />
          </CenteredColumn>
          <LoginFormErrorStyled>{this.state.error}</LoginFormErrorStyled>
          <LoginButtonStyled type="submit">Sign up</LoginButtonStyled>
          <LoginFormFootnote>
            <p>Already have an account?</p>
            <p>
              <Link to="/login">Click to sign in</Link>
            </p>
          </LoginFormFootnote>
        </CenteredColumn>
      </form>
    );
  }
}

export default RegisterForm;
