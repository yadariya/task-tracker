import React, { ChangeEvent, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginInputStyled } from '../../Form/styled/Input.styled';
import { LoginButtonStyled } from '../../Form/styled/Button.styled';
import { FlexColumn } from '../../Layout/Flexbox.styled';
import LoginFormHeading from '../../Typography/LoginFormHeading.styled';
import LoginFormFootnote from '../../Typography/LoginFormFootnote.styled';
import { logIn } from '../../../data/slices/user/authenticationSlice';
import LoginFormErrorStyled from '../../Typography/LoginFormError.styled';
import { store } from '../../../store/store';
import { authenticateUser } from '../../../data/api/user';

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
    authenticateUser(this.state.username, this.state.password)
      .then((response) => this.handleAuth(response))
      .catch((error) =>
        this.setState({
          error: error.response?.data.detail || 'An unknown error occured.',
        }),
      );
  }

  handleAuth(auth: AuthResult) {
    if (auth.access_token) {
      store.dispatch(logIn(auth.access_token));
      return;
    }

    this.setState({
      error: auth.detail || 'An unknown error occured.',
    });
  }

  render() {
    if (store.getState().authentication.accessToken !== null) {
      return <Navigate to="/" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <FlexColumn gap="1em" align="center">
          <LoginFormHeading>Sign In</LoginFormHeading>
          <FlexColumn gap="0.25em">
            <LoginInputStyled onChange={this.handleChange} placeholder="Username" name="username" />
            <LoginInputStyled
              onChange={this.handleChange}
              placeholder="Password"
              type="password"
              name="password"
            />
          </FlexColumn>
          <LoginFormErrorStyled>{this.state.error}</LoginFormErrorStyled>
          <LoginButtonStyled type="submit">Login</LoginButtonStyled>
          <LoginFormFootnote>
            <p>Don't have an account?</p>
            <p>
              <Link to="/register">Click to sign up</Link>
            </p>
          </LoginFormFootnote>
        </FlexColumn>
      </form>
    );
  }
}

export default LoginForm;
