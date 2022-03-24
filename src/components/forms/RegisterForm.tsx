import React, { ChangeEvent, FormEvent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LoginInputStyled } from '../Form/Input';
import { LoginButtonStyled } from '../Form/Button';
import { CenteredColumn } from '../Layout/CenteredColumn.styled';
import LoginFormHeading from '../Typography/LoginFormHeading';
import LoginFormFootnote from '../Typography/LoginFormFootnote';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store/store';

interface RegisterData {
    username: string;
    email: string;
    password: string;
}

class RegisterForm extends React.Component<{}, RegisterData> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        };
        this.recheckPassword = this.recheckPassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    recheckPassword(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        target.pattern = this.state.password;
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const name = target.name as 'username' | 'email' | 'password';
        if (!name) {
            return;
        }

        this.setState({
            [name]: target.value,
        } as Pick<RegisterData, keyof RegisterData>);
    }

    handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('form submit');
        fetch(process.env.API_ROOT + '/users/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        }).then((response) => console.log(response.json()));
    }

    render() {
        console.log(store.getState().authentication.access_token || 'no token');
        return (
            <form onSubmit={this.handleSubmit}>
                <CenteredColumn gap="1em">
                    <LoginFormHeading>Sign Up</LoginFormHeading>
                    <CenteredColumn gap="0.25em">
                        <LoginInputStyled
                            onChange={this.handleChange}
                            placeholder="Username"
                            pattern="[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]"
                            name="username"
                        />
                        <LoginInputStyled
                            onChange={this.handleChange}
                            placeholder="Email"
                            type="email"
                            pattern=".+@.+\..+"
                            name="email"
                        />
                        <LoginInputStyled
                            onChange={this.handleChange}
                            placeholder="Password"
                            type="password"
                            name="password"
                        />
                        <LoginInputStyled
                            onChange={this.recheckPassword}
                            placeholder="Repeat password"
                            type="password"
                        />
                    </CenteredColumn>
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
