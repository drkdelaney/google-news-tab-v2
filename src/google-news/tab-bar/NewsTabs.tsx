import { MouseEvent, useEffect, useRef, useState } from 'react';
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
    const [selectedKey, setSelectedKey] = useState(0);
    const [tabOffset, setTabOffset] = useState(0);
    const rowRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [menuRect, setMenu] = useState<DOMRect>();
    const [menuKey, setMenuKey] = useState<string>();

    function updateSelection(topic: Topic) {
        setSelectedKey(topics.length);
        dispatch({
            type: ActionType.SET_CURRENT_TOPIC,
            topic,
        });
    }

    function handleChange(_event: any, tabIndex: number) {
        setSelectedKey(tabIndex);
        dispatch({
            type: ActionType.SET_CURRENT_TOPIC,
            topic: topics[tabIndex],
        });
    }

    function handleContextMenu(e: MouseEvent<HTMLDivElement>, key: string) {
        const target = e.target as Element;
        const rect = target.getBoundingClientRect();
        setMenu(rect);
        setMenuKey(key);
        e.preventDefault();
    }

    function handleMenuMove() {
        console.log(menuKey);
    }

    function handleMenuDelete() {
        if (menuKey) {
            dispatch({ type: ActionType.REMOVE_TOPIC, key: menuKey });
        }
        console.log(menuKey);
    }

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

    useEffect(() => {
        function handleClick() {
            setMenu(undefined);
            setMenuKey(undefined);
        }
        handleClick();
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
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
                    {topics.map((topic: Topic) => {
                        return (
                            <StyledTab
                                key={topic.id}
                                label={topic.value}
                                onContextMenu={(e) => {
                                    handleContextMenu(e, topic.id);
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
                    <MenuItem onClick={handleMenuMove}>Move</MenuItem>
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
