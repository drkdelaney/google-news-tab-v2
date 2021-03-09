import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import { ActionType, Topic } from '../../models';
import { AddTab } from '.';
import { Tabs, Tab, withStyles } from '@material-ui/core';

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

const StyledTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
        zIndex: 2,
        backgroundColor: '#fff',
        margin: 12,
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

interface StyledTabProps {
    label: string;
}
const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'capitalize',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&:selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
            backgroundColor: 'transparent',
        },
    },
}))((props: StyledTabProps) => <Tab disableRipple {...props} />);

export function NewsTabs() {
    const { topics } = useAppState();
    const dispatch = useAppDispatch();
    const [selectedKey, setSelectedKey] = useState(0);
    const [tabOffset, setTabOffset] = useState(0);
    const rowRef = useRef() as React.MutableRefObject<HTMLDivElement>;

    function updateSelection(topic: Topic) {
        setSelectedKey(topics.length);
        dispatch({
            type: ActionType.SET_CURRENT_TOPIC,
            topic,
        });
    }

    function handleChange(event: any, tabIndex: number) {
        setSelectedKey(tabIndex);
    }

    useEffect(() => {
        dispatch({ type: ActionType.SET_CURRENT_TOPIC, topic: topics[0] });
    }, []);

    useEffect(() => {
        function handleResize() {
            const rowRight = rowRef.current?.getBoundingClientRect().toJSON()
                .right;
            setTabOffset(rowRight);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Container>
            <Row ref={rowRef}>
                <StyledTabs
                    value={selectedKey}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {topics.map((topic: Topic, i: number) => {
                        return <StyledTab key={topic.id} label={topic.value} />;
                    })}
                </StyledTabs>
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
