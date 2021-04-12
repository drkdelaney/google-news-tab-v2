import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import { ActionType, ModalType, Topic } from '../../models';
import { AddTab } from '.';
import { Tabs, Tab, withStyles } from '@material-ui/core';
import { usePrevious } from '../../util/UsePrevious';

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

interface MenuProps {
    top?: number;
    left?: number;
    open: boolean;
}
const Menu = styled.ul<MenuProps>`
    background-color: white;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
        rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
        rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
    display: ${(props) => (props.open ? 'inherit' : 'none')};
    left: ${(props) => props.left ?? 0}px;
    list-style-type: none;
    margin: 0;
    padding: 8px 0;
    position: fixed;
    top: ${(props) => props.top ?? 0}px;
    z-index: 2;
`;
const MenuItem = styled.li`
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    padding: 6px 16px;
    &:hover {
        text-decoration: none;
        background-color: rgba(0, 0, 0, 0.04);
    }
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
    onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
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
    const previousTopics = usePrevious(topics);
    const [selectedKey, setSelectedKey] = useState(0);
    const [tabOffset, setTabOffset] = useState(0);
    const rowRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [menuRect, setMenuRect] = useState<DOMRect>();
    const [menuTopic, setMenuTopic] = useState<Topic>();

    function updateSelection(topic: Topic) {
        setSelectedKey(topics.length);
        dispatch({
            type: ActionType.SET_CURRENT_TOPIC,
            topic,
        });
    }

    const handleChange = useCallback(
        (_event: any, tabIndex: number) => {
            setSelectedKey(tabIndex);
            dispatch({
                type: ActionType.SET_CURRENT_TOPIC,
                topic: topics[tabIndex],
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [topics]
    );

    function handleContextMenu(e: MouseEvent<HTMLDivElement>, topic: Topic) {
        const target = e.target as Element;
        const rect = target.getBoundingClientRect();
        setMenuRect(rect);
        setMenuTopic(topic);
        e.preventDefault();
    }

    function handleMenuEdit() {
        dispatch({
            type: ActionType.OPEN_MODAL,
            data: { modalType: ModalType.EDIT },
        });
    }

    function handleMenuDelete() {
        if (menuTopic) {
            dispatch({
                type: ActionType.OPEN_MODAL,
                data: { topic: menuTopic, modalType: ModalType.DELETE },
            });
        }
        setMenuRect(undefined);
        setMenuTopic(undefined);
    }

    /**
     * Handle the scenario where a user deletes the last topic and its selected.
     * -- OR --
     * User edits the order and the selected topic changes.
     */
    useEffect(() => {
        if (
            selectedKey >= topics.length &&
            previousTopics &&
            topics.length < previousTopics.length
        ) {
            handleChange(null, topics.length - 1);
        }
        if (
            previousTopics &&
            previousTopics.length &&
            topics[selectedKey].id !== previousTopics[selectedKey].id
        ) {
            handleChange(null, selectedKey);
        }
    }, [topics, handleChange, previousTopics, selectedKey]);

    /**
     * Handle resizing window and set the tab offset.
     */
    useEffect(() => {
        function handleResize() {
            const rowRight = rowRef.current?.getBoundingClientRect().right;
            setTabOffset(rowRight);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Handle clicking out side of context menu.
     */
    useEffect(() => {
        function handleClick() {
            setMenuRect(undefined);
            setMenuTopic(undefined);
        }
        handleClick();
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);

    return (
        <Container>
            <Row ref={rowRef}>
                <StyledTabs
                    value={
                        selectedKey > topics.length - 1
                            ? topics.length - 1
                            : selectedKey
                    }
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {topics.map((topic: Topic) => {
                        return (
                            <StyledTab
                                key={topic.id}
                                label={topic.value}
                                onContextMenu={(e) => {
                                    handleContextMenu(e, topic);
                                }}
                            />
                        );
                    })}
                </StyledTabs>
                <Menu
                    open={Boolean(menuRect)}
                    left={menuRect?.left}
                    top={menuRect?.top}
                >
                    <MenuItem onClick={handleMenuEdit}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuDelete}>Delete</MenuItem>
                </Menu>
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
