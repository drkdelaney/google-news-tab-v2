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

const GoogleLogo = styled.img`
    height: 92px;
    width: 272px;
`;

const DoodleImg = styled.img`
    height: 220px;
`;

export function GoogleImage() {
    const { doodles } = useAppState();
    const random = doodles?.length
        ? Math.floor(Math.random() * doodles?.length)
        : 0;

    return (
        <LogoContainer>
            <a href="https://www.google.com/">
                {doodles?.length && doodles.length > 0 ? (
                    <DoodleImg
                        src={doodles[random].image}
                        alt={doodles[random].title}
                        title={doodles[random].title}
                    />
                ) : (
                    <GoogleLogo
                        src={logo}
                        className="App-logo"
                        alt="google logo"
                        title="google"
                    />
                )}
            </a>
        </LogoContainer>
    );
}
