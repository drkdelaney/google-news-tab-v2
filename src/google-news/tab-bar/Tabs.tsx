import React, {
    useCallback,
    useEffect,
    useReducer,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { Map } from 'immutable';
import debounce from 'debounce';

interface TabsProps {
    children: JSX.Element[];
    count: number;
    selectedKey: string;
}

interface SelectBarProps {
    left?: number;
    width?: number;
}

const TabsContainer = styled.div`
    border-bottom: 1px solid #e8e8e8;
    display: flex;
`;

const TabsRow = styled.div<{ width: number }>`
    box-sizing: border-box;
    display: flex;
    overflow-x: scroll;
    position: relative;
    scrollbar-width: none;
    width: ${(props) => props.width}px;
`;

const SelectedBar = styled.span<SelectBarProps>`
    background-color: var(--blue);
    bottom: 0;
    height: 2px;
    left: ${(props) => (props.left ? `${props.left}px` : 0)};
    position: absolute;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: ${(props) => (props.width ? `${props.width}px` : 0)};
`;

const MoveButton = styled.button`
    appearance: button;
    background-color: transparent;
    border-radius: 0;
    border: 0;
    cursor: pointer;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-size: 0.8125rem;
    font-weight: 400;
    letter-spacing: 0.02857em;
    margin: 0;
    height: 48px;
    opacity: 0.7;
    outline: none;
    position: relative;
    text-decoration: none;
    text-transform: none;
    width: 40px;
`;

const Arrow = styled.i`
    border: solid black;
    border-width: 1.5px 1.5px 0 0;
    display: inline-block;
    padding: 3px;
`;

const RightArrow = styled(Arrow)`
    transform: rotate(45deg);
`;

const LeftArrow = styled(Arrow)`
    transform: rotate(-135deg);
`;

const initialState = Map<string | number, DOMRect>();

function reducer(
    state: Map<string | number, DOMRect>,
    action: { key: string | number; value: DOMRect }
) {
    return state.set(action.key, action.value);
}

export function Tabs(props: TabsProps) {
    const rowRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const containerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
    const [state, dispatch] = useReducer(reducer, initialState);
    const [selectedBarLeft, setSelectedBarLeft] = useState(0);
    const [barWidth, setBarWidth] = useState(0);
    const [totalWidth, setTotalWidth] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [atRight, setAtRight] = useState(false);

    useEffect(() => {
        const tabRect = state.get(props.selectedKey);
        const leftOffset = rowRef.current.getBoundingClientRect().left;
        setSelectedBarLeft((tabRect?.left ?? 0) - leftOffset);
        setBarWidth(tabRect?.width ?? 0);
    }, [props.selectedKey]);

    useEffect(() => {
        const total = state.reduce<number>(
            (total: number, value: DOMRect) => total + value.width,
            0
        );
        setTotalWidth(total);
    }, [state]);

    useEffect(() => {
        const inner = rowRef.current.getBoundingClientRect().width;
        const right = totalWidth - scrollLeft - inner;
        setAtRight(right > -5 && right < 5);
    }, [scrollLeft, totalWidth]);

    function setRef(key: string | number | null, ref: HTMLButtonElement) {
        if (ref && key && !state.has(key)) {
            const rect = ref.getBoundingClientRect();
            dispatch({ key, value: rect });
        }
    }

    const children = React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
            ref: (ref: HTMLButtonElement) => {
                setRef(child.key, ref);
            },
        });
    });

    const delayedSet = useCallback(
        debounce((data: number) => setScrollLeft(data), 250),
        []
    );

    function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
        const target = event.target as HTMLDivElement;
        delayedSet(target.scrollLeft);
    }

    return (
        <TabsContainer ref={containerRef}>
            <MoveButton
                onClick={() => {
                    rowRef.current.scrollTo({
                        left: 0,
                        behavior: 'smooth',
                    });
                }}
            >
                {scrollLeft > 0 && <LeftArrow />}
            </MoveButton>
            <TabsRow ref={rowRef} width={totalWidth} onScroll={handleScroll}>
                {children}
                <SelectedBar left={selectedBarLeft} width={barWidth} />
            </TabsRow>
            <MoveButton
                onClick={() => {
                    rowRef.current.scrollTo({
                        left: totalWidth,
                        behavior: 'smooth',
                    });
                }}
            >
                {!atRight && <RightArrow />}
            </MoveButton>
        </TabsContainer>
    );
}
