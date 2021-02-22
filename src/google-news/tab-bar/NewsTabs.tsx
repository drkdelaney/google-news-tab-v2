import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import { ActionType, Topic } from '../../models';
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
    const dispatch = useAppDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);

    function updateSelection(topic: Topic, index: number) {
        setSelectedIndex(index);
        dispatch({
            type: ActionType.SET_CURRENT_TOPIC,
            topic,
        });
    }

    useEffect(() => {
        dispatch({ type: ActionType.SET_CURRENT_TOPIC, topic: topics[0] });
    }, []);

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
                                    updateSelection(topics[i], i);
                                }}
                            />
                        );
                    })}
                </Tabs>
                <AddTab
                    key="addTabKey"
                    onTabAdded={(topic: Topic) => {
                        updateSelection(topic, topics.length);
                    }}
                />
            </Row>
        </Container>
    );
}
