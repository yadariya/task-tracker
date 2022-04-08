import React, { ChangeEvent, FormEvent, RefObject } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { LoginInputStyled } from '../../Form/Input';
import { LoginButtonStyled } from '../../Form/Button';
import { FlexColumn } from '../../Layout/Flexbox.styled';
import LoginFormHeading from '../../Typography/LoginFormHeading';
import LoginFormFootnote from '../../Typography/LoginFormFootnote';
import { store } from '../../../store/store';
import LoginFormErrorStyled from '../../Typography/LoginFormError';

interface EmailFormState {
  email: string;
  error: string;
  emailSent: boolean;
}

class EmailForm extends React.Component<{}, EmailFormState> {
  emailRef: RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      error: '',
      emailSent: false,
    };
    this.emailRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.askConfirmation = this.askConfirmation.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const name = target.name as 'email';
    if (!name) {
      return;
    }

    this.setState({
      [name]: target.value,
    } as Pick<EmailFormState, keyof EmailFormState>);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch(`${process.env.API_ROOT}/users/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: this.state.email }),
    }).then(async (r) =>
      r.ok
        ? this.askConfirmation()
        : this.setState({
            error: await r.text(),
          })
    );
  }

  askConfirmation() {
    const emailField = this.emailRef.current!;
    emailField.disabled = true;

    this.setState({
      emailSent: true,
    });
  }

  render() {
    if (store.getState().authentication.accessToken !== null) {
      return <Navigate to="/" />;
    }
    const formPart = this.state.emailSent ? (
      <div>
        <p>
          A confirmation letter has been <br />
          sent to your email.
        </p>
        <p>
          Please, open it and follow the link <br />
          to complete the registration.
        </p>
      </div>
    ) : (
      <div>
        <LoginFormErrorStyled>{this.state.error}</LoginFormErrorStyled>
        <LoginButtonStyled type="submit">Sign up</LoginButtonStyled>
      </div>
    );
    return (
      <form onSubmit={this.handleSubmit}>
        <FlexColumn gap="1em" align="center" textAlign="center">
          <LoginFormHeading>Sign Up</LoginFormHeading>
          <LoginInputStyled
            onChange={this.handleChange}
            placeholder="Email"
            pattern=".+@.+\..+"
            type="email"
            name="email"
            ref={this.emailRef}
            title="Provide a valid email."
            required
          />
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

export default EmailForm;
