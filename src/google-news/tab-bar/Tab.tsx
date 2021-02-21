import { forwardRef } from 'react';
import styled from 'styled-components';

interface TabProps {
    label: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const StyledButton = styled.button`
    align-items: center;
    appearance: button;
    background-color: transparent;
    border-radius: 0;
    border: 0;
    cursor: pointer;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 0.8125rem;
    font-weight: 400;
    letter-spacing: 0.02857em;
    margin: 0;
    height: 48px;
    min-width: 72px;
    opacity: 0.7;
    outline: none;
    overflow: hidden;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    text-overflow: ellipsis;
    text-transform: none;
    user-select: none;
    white-space: nowrap;

    &:hover {
        color: #40a9ff;
        opacity: 1;
    }

    & > span {
        text-transform: capitalize;
    }
`;

const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => (
    <StyledButton ref={ref} onClick={props.onClick}>
        <span>{props.label}</span>
    </StyledButton>
));

export { Tab };
