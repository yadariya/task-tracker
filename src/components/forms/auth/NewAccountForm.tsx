import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginInputStyled } from '../../Form/styled/Input.styled';
import { LoginButtonStyled } from '../../Form/styled/Button.styled';
import { FlexColumn } from '../../Layout/Flexbox.styled';
import LoginFormHeading from '../../Typography/LoginFormHeading.styled';
import LoginFormFootnote from '../../Typography/LoginFormFootnote.styled';
import { store } from '../../../store/store';
import { logIn } from '../../../data/slices/user/authenticationSlice';
import LoginFormErrorStyled from '../../Typography/LoginFormError.styled';
import { confirmUserCreation } from '../../../data/api/user';

interface RegistrationResult {
  detail: string | undefined;
  access_token: string | undefined;
}

interface NewAccountFormState {
  confirmation: string;
  username: string;
  password: string;
  error: string;
}

class NewAccountForm extends React.Component<{ confirmation: string | null }, NewAccountFormState> {
  repeatPasswordRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.state = {
      confirmation: this.props.confirmation || '',
      username: '',
      password: '',
      error: '',
    };
    this.repeatPasswordRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const name = target.name as 'username' | 'password';
    if (!name) {
      return;
    }

    this.setState({
      [name]: target.value,
    } as Pick<NewAccountFormState, keyof NewAccountFormState>);
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

    confirmUserCreation(this.state.confirmation, {
      ...this.state,
      role: 'Newbie',
    })
      .then((response) => this.handleRegistration(response))
      .catch((error) =>
        this.setState({
          error: error.response?.data.detail || 'An unknown error occured.',
        }),
      );
  }

  handleRegistration(auth: RegistrationResult) {
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
    const formPart = this.state.confirmation ? (
      <FlexColumn gap="1em" align="center">
        <FlexColumn gap="0.25em">
          <LoginInputStyled
            onChange={this.handleChange}
            placeholder="Username"
            pattern="[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]"
            name="username"
            title="Provide a valid username."
            required
          />
          <ul>
            <li>
              Username should consist of <br />
              letters or digits or symbols: <b>. _ -</b>
            </li>
            <li>Username length must be between 5 to 20.</li>
            <li>
              Symbols must not start or end the username <br />
              and appear consecutively, e.g. <b>user..name</b>
            </li>
          </ul>
          <LoginInputStyled
            onChange={this.handleChange}
            placeholder="Password"
            minLength={8}
            type="password"
            name="password"
            required
          />
          <LoginInputStyled
            placeholder="Repeat password"
            ref={this.repeatPasswordRef}
            type="password"
            required
          />
        </FlexColumn>
        <LoginFormErrorStyled>{this.state.error}</LoginFormErrorStyled>
        <LoginButtonStyled type="submit">Sign up</LoginButtonStyled>
      </FlexColumn>
    ) : (
      <FlexColumn textAlign="center">
        <p>The URL does not contain a confirmation token.</p>
        <p>Make sure you followed the right link.</p>
      </FlexColumn>
    );
    return (
      <form onSubmit={this.handleSubmit}>
        <FlexColumn gap="1em" align="center">
          <LoginFormHeading>Sign Up</LoginFormHeading>
          {formPart}
          <LoginFormFootnote>
            <p>Already have an account?</p>
            <p>
              <Link to="/login">Click to sign in</Link>
            </p>
          </LoginFormFootnote>
        </FlexColumn>
      </form>
    );
  }
}

export default NewAccountForm;
