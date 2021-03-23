import { Topic } from './Topic';

export interface ModalProps {
    topic?: Topic;
    modalType: ModalType;
}

export enum ModalType {
    DELETE,
    EDIT,
}
