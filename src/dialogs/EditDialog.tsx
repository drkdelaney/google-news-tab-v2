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
import { useState } from 'react';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { ActionType } from '../models';

interface DraggableListItemProps {
    draggable: boolean;
    children: JSX.Element[];
    key: string;
    isDragging: boolean;
    draggingOver: boolean;
    onDragStart: (event: React.DragEvent<HTMLLIElement>) => void;
    onDragEnd: (event: React.DragEvent<HTMLLIElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLLIElement>) => void;
    onDrop: (event: React.DragEvent<HTMLLIElement>) => void;
}

const DraggableListItem = withStyles((theme) => ({
    root: {
        cursor: 'move',
        visibility: (props: DraggableListItemProps) =>
            props.isDragging ? 'hidden' : 'visible',
        border: (props: DraggableListItemProps) =>
            props.draggingOver ? '3px dashed black' : '',
        boxShadow: 'border-box',
    },
}))((props: DraggableListItemProps) => <ListItem {...props} />);

export function EditDialog() {
    const { topics } = useAppState();
    const dispatch = useAppDispatch();
    const [draggedTaskId, setDraggedTaskId] = useState<number>();
    const [dragOverId, setDragOverId] = useState<number>();

    function handleClose() {
        dispatch({ type: ActionType.OPEN_MODAL, data: undefined });
    }

    function handleDragStart(i: number, e: React.DragEvent<HTMLLIElement>) {
        e.dataTransfer.setData('dragIndex', `${i}`);
        setDraggedTaskId(i);
    }

    function handleDragOver(i: number, e: React.DragEvent<HTMLLIElement>) {
        e.preventDefault();
        setDragOverId(i);
    }

    function handleDragEnd() {
        setDraggedTaskId(undefined);
        setDragOverId(undefined);
    }

    function handleDrop(i: number, e: React.DragEvent<HTMLLIElement>) {
        const dragIndex = e.dataTransfer.getData('dragIndex');
        const result = Array.from(topics);
        const [removed] = result.splice(Number(dragIndex), 1);
        result.splice(i, 0, removed);

        dispatch({ type: ActionType.SET_TOPICS, topics: result });
    }

    return (
        <Dialog open={true} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Edit your tasks</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Drag the topics to reorder.
                </DialogContentText>
                <List>
                    {topics.map((topic, i) => (
                        <>
                            <DraggableListItem
                                key={`list-item-${i}`}
                                draggable
                                isDragging={draggedTaskId === i}
                                draggingOver={dragOverId === i}
                                onDragStart={(event) => {
                                    handleDragStart(i, event);
                                }}
                                onDragEnd={handleDragEnd}
                                onDrop={(event) => {
                                    handleDrop(i, event);
                                }}
                                onDragOver={(event) => {
                                    handleDragOver(i, event);
                                }}
                            >
                                <ListItemIcon>
                                    <DragIndicator></DragIndicator>
                                </ListItemIcon>
                                <ListItemText>{topic.value}</ListItemText>
                            </DraggableListItem>
                            <Divider key={`divider-${i}`}></Divider>
                        </>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
