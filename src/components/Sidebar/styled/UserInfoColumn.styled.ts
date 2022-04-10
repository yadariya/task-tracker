import styled from 'styled-components';


const UserInfoColumnStyled = styled.div`
  & > :first-child > :first-child {
    font-size: 0.9em;
    font-weight: 500;
  }

  & > :first-child > :first-child + div {
    font-size: 0.8em;
    color: rgba(0, 0, 0, 0.5);
  }
`

export default UserInfoColumnStyled;
