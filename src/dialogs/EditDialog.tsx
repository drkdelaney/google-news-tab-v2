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
import { useAppDispatch, useAppState } from '../context/AppContext';
import { ActionType } from '../models';

interface DraggableListItemProps {
    draggable: boolean;
}
const DraggableListItem = withStyles((theme) => ({
    root: {
        cursor: 'move',
    },
}))((props: DraggableListItemProps) => <ListItem {...props} />);

export function EditDialog() {
    const { topics } = useAppState();
    const dispatch = useAppDispatch();

    function handleClose() {
        dispatch({ type: ActionType.OPEN_MODAL, data: undefined });
    }
    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Edit your tasks?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Drag the topics to reorder.
                </DialogContentText>
                <List>
                    {topics.map((topic) => (
                        <>
                            <DraggableListItem key={topic.id} draggable>
                                <ListItemIcon>
                                    <DragIndicator></DragIndicator>
                                </ListItemIcon>
                                <ListItemText>{topic.value}</ListItemText>
                            </DraggableListItem>
                            <Divider></Divider>
                        </>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} autoFocus>
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
}
