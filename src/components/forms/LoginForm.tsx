import React, { ChangeEvent, FormEvent } from 'react';
import { Link, NavigateFunction } from 'react-router-dom';
import { LoginInputStyled } from '../Form/Input';
import { LoginButtonStyled } from '../Form/Button';
import { CenteredColumn } from '../Layout/CenteredColumn.styled';
import LoginFormHeading from '../Typography/LoginFormHeading';
import LoginFormFootnote from '../Typography/LoginFormFootnote';
import { logIn } from '../../data/slices/authenticationSlice';
import LoginFormError from '../Typography/LoginFormError';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store/store';

interface AuthResult {
    detail: string | undefined;
    access_token: string | undefined;
}

class LoginForm extends React.Component<{ navigate: NavigateFunction }> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value,
        });
    }

    async handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        fetch(process.env.API_ROOT + '/users/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
            .then((response) => response.json())
            .then((auth) => this.handleAuth(auth));
    }

    handleAuth(auth: AuthResult) {
        if (auth.access_token) {
            logIn(auth.access_token);
            this.props.navigate('/');
            return;
        }

        console.error(auth.detail);
    }

    render() {
        console.log(store.getState().authentication.access_token || 'no token');
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
