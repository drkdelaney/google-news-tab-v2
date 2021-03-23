import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    withStyles,
} from '@material-ui/core';
import { red, grey } from '@material-ui/core/colors';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { ActionType, ModalType } from '../models';

const DeleteButton = withStyles(() => ({
    root: {
        color: red[500],
        '&:hover': {
            backgroundColor: red[50],
        },
    },
}))(Button);

const RegularButton = withStyles(() => ({
    root: {
        color: grey[600],
        '&:hover': {
            backgroundColor: grey[50],
        },
    },
}))(Button);

export function DeleteDialog() {
    const { modalProps } = useAppState();
    const dispatch = useAppDispatch();

    function handleClose() {
        dispatch({ type: ActionType.OPEN_MODAL, data: undefined });
    }

    function handleDelete() {
        if (modalProps?.topic) {
            dispatch({
                type: ActionType.REMOVE_TOPIC,
                key: modalProps?.topic?.id,
            });
        }
        handleClose();
    }

    return (
        <Dialog open={true} onClose={handleClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete "{modalProps?.topic?.value}"
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <RegularButton onClick={handleClose}>No, thanks</RegularButton>
                <DeleteButton onClick={handleDelete} autoFocus>
                    Yes, delete
                </DeleteButton>
            </DialogActions>
        </Dialog>
    );
}
