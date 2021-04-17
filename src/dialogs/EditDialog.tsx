import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles,
} from '@material-ui/core';
import DragIndicator from '@material-ui/icons/DragIndicator';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { ActionType } from '../models';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';

const DeleteWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0;
`;

interface DraggableListItemProps {
    draggable: boolean;
    children: JSX.Element[];
    key: string;
    draggingOver: boolean;
    onDragStart: (event: React.DragEvent<HTMLLIElement>) => void;
    onDragEnd: (event: React.DragEvent<HTMLLIElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
    onDrop: (event: React.DragEvent<HTMLLIElement>) => void;
}

const DraggableListItem = withStyles(() => ({
    root: {
        cursor: 'grab',
        backgroundColor: (props: DraggableListItemProps) =>
            props.draggingOver ? 'var(--light-grey' : 'white',
        boxShadow: 'border-box',
        textTransform: 'capitalize',
        height: 48,
    },
}))((props: DraggableListItemProps) => {
    const { draggingOver, ...rest } = props; // remove unused props
    return <ListItem {...rest} />;
});

export function EditDialog() {
    const { topics } = useAppState();
    const dispatch = useAppDispatch();
    const [localTopics, setLocalTopics] = useState(topics);
    const [dragOverId, setDragOverId] = useState<number>();
    const [hoverTrash, setHoverTrash] = useState(false);
    const [dragIndex, setDragIndex] = useState<number>();

    function handleClose() {
        dispatch({ type: ActionType.OPEN_MODAL, data: undefined });
    }

    function handleDragStart(i: number, e: React.DragEvent<HTMLLIElement>) {
        setDragIndex(i);
    }

    function handleDragOver(i: number, e: React.DragEvent<HTMLLIElement>) {
        if (i !== dragOverId && dragIndex !== undefined) {
            setDragOverId(i);
            const result = Array.from(topics);
            const [removed] = result.splice(dragIndex, 1);
            result.splice(i, 0, removed);
            setLocalTopics(result);
        }
        e.preventDefault();
    }

    function handleDragEnd(e: React.DragEvent<HTMLLIElement>) {
        setDragIndex(undefined);
        setDragOverId(undefined);
        e.preventDefault();
    }

    function handleDrop(e: React.DragEvent<HTMLLIElement>) {
        dispatch({ type: ActionType.SET_TOPICS, topics: localTopics });
        e.preventDefault();
    }

    function handleDragOverTrash(e: React.DragEvent<HTMLDivElement>) {
        setDragOverId(undefined);
        setDragIndex(undefined);
        setHoverTrash(true);
        e.preventDefault();
    }

    function handleDragLeaveTrash(e: React.DragEvent<HTMLDivElement>) {
        setHoverTrash(false);
        e.preventDefault();
    }

    function handleDropTrash(e: React.DragEvent<HTMLDivElement>) {
        setHoverTrash(false);
        if (dragIndex !== undefined) {
            const deleteThisTopic = topics[dragIndex];
            dispatch({
                type: ActionType.REMOVE_TOPIC,
                key: deleteThisTopic.id,
            });
        }
        e.preventDefault();
    }

    useEffect(() => {
        setLocalTopics(topics);
    }, [topics]);

    return (
        <Dialog open={true} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Edit your tasks</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Drag the topics to reorder.
                </DialogContentText>
                <List>
                    {localTopics.map((topic, i) => [
                        <DraggableListItem
                            key={`list-item-${i}`}
                            draggable
                            draggingOver={dragOverId === i}
                            onDragStart={(event) => {
                                handleDragStart(i, event);
                            }}
                            onDragEnd={handleDragEnd}
                            onDrop={handleDrop}
                            onDragOver={(event) => {
                                handleDragOver(i, event);
                            }}
                        >
                            {dragOverId !== i ? (
                                <ListItemIcon>
                                    <DragIndicator></DragIndicator>
                                </ListItemIcon>
                            ) : (
                                <></>
                            )}
                            {dragOverId !== i ? (
                                <ListItemText>{topic.value}</ListItemText>
                            ) : (
                                <></>
                            )}
                        </DraggableListItem>,
                        <Divider key={`divider-${topic.id}`}></Divider>,
                    ])}
                </List>
                <DeleteWrapper
                    onDragOver={handleDragOverTrash}
                    onDragLeave={handleDragLeaveTrash}
                    onDrop={handleDropTrash}
                >
                    {hoverTrash ? (
                        <DeleteForeverIcon fontSize="large" color="error" />
                    ) : (
                        <DeleteIcon fontSize="large" />
                    )}
                </DeleteWrapper>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
