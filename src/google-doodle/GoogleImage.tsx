import styled from 'styled-components';
import { useAppState } from '../context/AppContext';
import logo from './google-logo.svg';

const LogoContainer = styled.div`
    height: 220px;
    margin-top: var(--logo-margin-top);
    position: relative;
    text-align: center;
    display: grid;
    justify-items: center;
    align-content: flex-end;
`;

const GoogleLogo = styled.a`
    height: 92px;
    width: 272px;
`;

export function GoogleImage() {
    const { doodles } = useAppState();

    return (
        <LogoContainer>
            <GoogleLogo href="https://www.google.com/">
                <img
                    src={logo}
                    className="App-logo"
                    alt="google logo"
                    title="google"
                />
            </GoogleLogo>
        </LogoContainer>
    );
}
