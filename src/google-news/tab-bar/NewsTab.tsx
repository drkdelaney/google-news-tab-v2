import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppState } from '../../context/AppContext';
import { Topic } from '../../models';
import { Tab, AddTab } from '.';

const Container = styled.div`
    display: grid;
    justify-content: center;
`;

const Row = styled.div<{ count: number }>`
    align-items: center;
    display: inline-grid;
    grid-template-columns: repeat(${(props) => props.count}, auto);
    justify-content: center;
    overflow: auto;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
`;

export function NewsTabs() {
    const { topics } = useAppState();
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <Container>
            <Row count={topics.length + 1}>
                <Tabs selectedIndex={selectedIndex}>
                    {topics.map((topic: Topic, i: number) => {
                        return (
                            <Tab
                                key={topic.id}
                                label={topic.value}
                                onClick={() => {
                                    setSelectedIndex(i);
                                }}
                            />
                        );
                    })}
                </Tabs>
                <AddTab key="addTabKey" />
            </Row>
        </Container>
    );
}

interface TabsProps {
    selectedIndex: number;
    children: JSX.Element[];
}
interface SelectBarProps {
    left?: number;
    width?: number;
}
const SelectedBar = styled.span<SelectBarProps>`
    background-color: #1890ff;
    height: 2px;
    bottom: 0;
    position: absolute;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: ${(props) => (props.width ? `${props.width}px` : 0)};
    left: ${(props) => (props.left ? `${props.left}px` : 0)};
`;
const TabsContainer = styled.div`
    position: relative;
`;

function Tabs(props: TabsProps) {
    const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const tabRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
    const [left, setLeft] = useState(0);
    const [width, setWidth] = useState(0);

    console.log(tabRef.current, props.selectedIndex);
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
