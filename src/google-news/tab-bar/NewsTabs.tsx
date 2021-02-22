import React, { useState } from 'react';
import styled from 'styled-components';
import { useAppState } from '../../context/AppContext';
import { Topic } from '../../models';
import { Tab, AddTab, Tabs } from '.';

const Container = styled.div`
    display: grid;
    justify-content: center;
`;

const Row = styled.div<{ count: number }>`
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    display: inline-grid;
    grid-template-columns: repeat(${(props) => props.count}, auto);
    justify-content: center;
    overflow: auto;
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
