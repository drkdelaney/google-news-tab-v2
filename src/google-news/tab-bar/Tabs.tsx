import React, { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import { Map } from 'immutable';

interface TabsProps {
    selectedKey: string;
    count: number;
    children: JSX.Element[];
}

interface SelectBarProps {
    left?: number;
    width?: number;
}

const TabsContainer = styled.div<{ width: number }>`
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: center;
    position: relative;
    width: ${(props) => props.width}px;
`;

const SelectedBar = styled.span<SelectBarProps>`
    background-color: var(--blue);
    height: 2px;
    bottom: 0;
    position: absolute;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: ${(props) => (props.width ? `${props.width}px` : 0)};
    left: ${(props) => (props.left ? `${props.left}px` : 0)};
`;

const initialState = Map<string | number, DOMRect>();

function reducer(
    state: Map<string | number, DOMRect>,
    action: { key: string | number; value: DOMRect }
) {
    return state.set(action.key, action.value);
}

export function Tabs(props: TabsProps) {
    const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [state, dispatch] = useReducer(reducer, initialState);
    const [left, setLeft] = useState(0);
    const [barWidth, setBarWidth] = useState(0);
    const [totalWidth, setTotalWidth] = useState(0);

    useEffect(() => {
        const tabRect = state.get(props.selectedKey);
        setLeft(tabRect?.left ?? 0);
        setBarWidth(tabRect?.width ?? 0);
    }, [props.selectedKey]);

    useEffect(() => {
        const total = state.reduce<number>(
            (total: number, value: DOMRect) => total + value.width,
            0
        );
        setTotalWidth(total);
    }, [state]);

    function setRef(ref: HTMLButtonElement, key: string | number | null) {
        if (ref && key && !state.has(key)) {
            const rect = ref.getBoundingClientRect();
            dispatch({ key, value: rect });
        }
    }

    console.log(totalWidth);

    const children = React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
            ref: (ref: HTMLButtonElement) => {
                setRef(ref, child.key);
            },
        });
    });

    return (
        <TabsContainer ref={containerRef} width={totalWidth}>
            {children}
            <SelectedBar left={left} width={barWidth} />
        </TabsContainer>
    );
}
