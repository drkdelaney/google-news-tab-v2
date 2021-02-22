import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface TabsProps {
    selectedIndex: number;
    children: JSX.Element[];
}

interface SelectBarProps {
    left?: number;
    width?: number;
}

const TabsContainer = styled.div`
    position: relative;
`;

const SelectedBar = styled.span<SelectBarProps>`
    background-color: #4285f4;
    height: 2px;
    bottom: 0;
    position: absolute;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: ${(props) => (props.width ? `${props.width}px` : 0)};
    left: ${(props) => (props.left ? `${props.left}px` : 0)};
`;

export function Tabs(props: TabsProps) {
    const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const tabRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        const tabRect = tabRef?.current?.getBoundingClientRect();
        const left = (tabRect?.left ?? 0) - (containerRect?.left ?? 0);
        const width = tabRect?.width;
        setLeft(left);
        setWidth(width);
    }, [props.selectedIndex]);

    const children = React.Children.map(props.children, (child, i) => {
        return React.cloneElement(child, {
            ref: props.selectedIndex === i ? tabRef : null,
        });
    });

    return (
        <TabsContainer ref={containerRef}>
            {children}
            <SelectedBar left={left} width={width} />
        </TabsContainer>
    );
}
