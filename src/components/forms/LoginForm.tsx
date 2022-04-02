import React, { ChangeEvent, FormEvent, ReactElement } from 'react';
import { Link, Navigate, NavigateFunction } from 'react-router-dom';
import { LoginInputStyled } from '../Form/Input';
import { LoginButtonStyled } from '../Form/Button';
import { CenteredColumn } from '../Layout/CenteredColumn.styled';
import LoginFormHeading from '../Typography/LoginFormHeading';
import LoginFormFootnote from '../Typography/LoginFormFootnote';
import { logIn } from '../../data/slices/authenticationSlice';
import LoginFormErrorStyled from '../Typography/LoginFormError';
import { store } from '../../store/store';

interface AuthResult {
  detail: string | undefined;
  access_token: string | undefined;
}

interface LoginFormState {
  username: string;
  password: string;
  error: string;
}

class LoginForm extends React.Component<{}, LoginFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    store.subscribe(this.render.bind(this));
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const name = target.name as 'username' | 'password';
    if (!name) {
      return;
    }

    this.setState({
      [name]: target.value,
    } as Pick<LoginFormState, keyof LoginFormState>);
  }

  async handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetch(`${process.env.API_ROOT}/users/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
      .then((response) => response.json())
      .then((auth) => this.handleAuth(auth));
  }

  handleAuth(auth: AuthResult) {
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
          <LoginFormHeading>Sign In</LoginFormHeading>
          <CenteredColumn gap="0.25em">
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
          </CenteredColumn>
          <LoginFormErrorStyled>{this.state.error}</LoginFormErrorStyled>
          <LoginButtonStyled type="submit">Login</LoginButtonStyled>
          <LoginFormFootnote>
            <p>Don't have an account?</p>
            <p>
              <Link to="/register">Click to sign up</Link>
            </p>
          </LoginFormFootnote>
        </CenteredColumn>
      </form>
    );
  }
}

export default LoginForm;
