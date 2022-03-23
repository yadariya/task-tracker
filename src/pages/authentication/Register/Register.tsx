import { TransparentBoxStyled } from '../../../components/Layout/Box.styled'
import { LoginInputStyled } from '../../../components/Form/Input'
import { LoginButtonStyled } from '../../../components/Form/Button'
import { CenteredColumn } from '../../../components/Layout/CenteredColumn.styled'
import LoginFormHeading from '../../../components/Typography/LoginFormHeading'
import { Link } from 'react-router-dom'
import LoginFormFootnote from '../../../components/Typography/LoginFormFootnote'

export default function Register() {
  return (
    <TransparentBoxStyled>
      <CenteredColumn gap="1em">
        <LoginFormHeading>Sign Up</LoginFormHeading>
        <CenteredColumn gap="0.25em">
          <LoginInputStyled
            placeholder='Username'
            pattern="[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]"
          />
          <LoginInputStyled placeholder='Email'/>
          <LoginInputStyled placeholder='Password' type="password"/>
          <LoginInputStyled placeholder='Repeat password' type="password"/>
        </CenteredColumn>
        <LoginButtonStyled>Sign up</LoginButtonStyled>
        <LoginFormFootnote>
          <p>Already have an account?</p>
          <p><Link to="/login">Click to sign in</Link></p>
        </LoginFormFootnote>
      </CenteredColumn>
    </TransparentBoxStyled>
  )
}
