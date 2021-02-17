import styled from 'styled-components';
import { useAppState } from '../context/AppContext';
import { useRandomNumber } from '../util/RandomNumber';
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
    const random = useRandomNumber(doodles?.length ?? 0);

    return (
        <LogoContainer>
            {doodles?.length && doodles.length > 0 ? (
                <a href={doodles[random].link}>
                    <DoodleImg
                        src={doodles[random].image}
                        alt={doodles[random].title}
                        title={doodles[random].title}
                    />
                </a>
            ) : (
                <a href="https://www.google.com/">
                    <GoogleLogo
                        src={logo}
                        className="App-logo"
                        alt="google logo"
                        title="google"
                    />
                </a>
            )}
        </LogoContainer>
    );
}
