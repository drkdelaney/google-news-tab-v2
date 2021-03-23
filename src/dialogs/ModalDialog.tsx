import { useAppState } from '../context/AppContext';
import { ModalType } from '../models';
import { DeleteDialog } from './DeleteDialog';
import { EditDialog } from './EditDialog';

export function ModalDialog() {
    const { modalProps } = useAppState();

    if (!modalProps) return <div></div>;

    const mapDialog = {
        [ModalType.DELETE]: DeleteDialog,
        [ModalType.EDIT]: EditDialog,
    };

    const Modal = mapDialog[modalProps.modalType];

    return <Modal></Modal>;
}
