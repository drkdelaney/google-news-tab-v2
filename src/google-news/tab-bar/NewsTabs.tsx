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
    const [selectedKey, setSelectedKey] = useState('');
    const [tabOffset, setTabOffset] = useState(0);
    const rowRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    function updateSelection(topic: Topic) {
        setSelectedKey(topic.id);
        dispatch({
            type: ActionType.SET_CURRENT_TOPIC,
            topic,
        });
    }

    useEffect(() => {
        dispatch({ type: ActionType.SET_CURRENT_TOPIC, topic: topics[0] });
        setSelectedKey(topics[0].id);
    }, []);

    useEffect(() => {
        const rowRight = rowRef.current.getBoundingClientRect().toJSON().right;
        setTabOffset(rowRight);
    }, [topics]);

    return (
        <Container>
            <Row ref={rowRef}>
                <Tabs selectedKey={selectedKey} count={topics.length}>
                    {topics.map((topic: Topic, i: number) => {
                        return (
                            <Tab
                                key={topic.id}
                                label={topic.value}
                                onClick={() => {
                                    updateSelection(topics[i]);
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
                        updateSelection(topic);
                    }}
                />
            </AddTabContainer>
        </Container>
    );
}
