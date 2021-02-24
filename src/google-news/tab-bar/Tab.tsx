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
    opacity: 0.7;
    outline: none;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    user-select: none;
    white-space: nowrap;

    &:hover {
        color: var(--blue);
        opacity: 1;
    }

    & > span {
        text-transform: capitalize;
    }
`;

export const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => (
    <StyledButton ref={ref} onClick={props.onClick}>
        <span
            onClick={(e) => {
                e.preventDefault();
            }}
        >
            {props.label}
        </span>
    </StyledButton>
));
