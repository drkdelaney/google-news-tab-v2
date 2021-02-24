import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import { ActionType, Topic } from '../../models';
import { Tab, AddTab, Tabs } from '.';

const Container = styled.div`
    position: relative;
`;

const Row = styled.div`
    margin: 0 auto;
    overflow: auto;
    width: 700px;
`;

const AddTabContainer = styled.div<{ offset: number }>`
    left: ${(props) => props.offset}px;
    position: absolute;
    top: 0;
`;

export function NewsTabs() {
    const { topics } = useAppState();
    const dispatch = useAppDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [tabOffset, setTabOffset] = useState(0);
    const rowRef = useRef() as React.MutableRefObject<HTMLDivElement>;

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

    useEffect(() => {
        const rowRight = rowRef.current.getBoundingClientRect().right;
        setTabOffset(rowRight);
    }, [topics]);

    return (
        <Container>
            <Row ref={rowRef}>
                <Tabs selectedIndex={selectedIndex} count={topics.length}>
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
            </Row>
            <AddTabContainer offset={tabOffset}>
                <AddTab
                    key="addTabKey"
                    onTabAdded={(topic: Topic) => {
                        updateSelection(topic, topics.length);
                    }}
                />
            </AddTabContainer>
        </Container>
    );
}
