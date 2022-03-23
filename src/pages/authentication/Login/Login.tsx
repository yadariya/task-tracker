import { TransparentBoxStyled } from '../../../components/Layout/Box.styled'
import { LoginInputStyled } from '../../../components/Form/Input'
import { LoginButtonStyled } from '../../../components/Form/Button'
import { CenteredColumn } from '../../../components/Layout/CenteredColumn.styled'
import LoginFormHeading from '../../../components/Typography/LoginFormHeading'
import { Link } from 'react-router-dom'
import LoginFormFootnote from '../../../components/Typography/LoginFormFootnote'

export default function Login() {
  return (
    <TransparentBoxStyled>
      <CenteredColumn gap="1em">
        <LoginFormHeading>Sign In</LoginFormHeading>
        <CenteredColumn gap="0.25em">
          <LoginInputStyled
            placeholder="Username"
            pattern="[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]"
          />
          <LoginInputStyled placeholder="Password" type="password"/>
        </CenteredColumn>
        <LoginButtonStyled>Login</LoginButtonStyled>
        <LoginFormFootnote>
          <p>Don't have an account?</p>
          <p><Link to="/register">Click to sign up</Link></p>
        </LoginFormFootnote>
      </CenteredColumn>
    </TransparentBoxStyled>
  )
}
