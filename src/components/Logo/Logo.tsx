import { LogoFont, BigLogoFont } from '../Typography/Logo';
import { LogoWrapper } from './styled/Logo.styled';

export const Logo: React.FC = () => (
    <LogoFont>
        <LogoWrapper>TaskManager</LogoWrapper>
    </LogoFont>
);

export const BigLogo: React.FC = () => (
    <BigLogoFont>
        <LogoWrapper>TaskManager</LogoWrapper>
    </BigLogoFont>
);
