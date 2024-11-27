import {ComponentType} from 'react';

export enum ButtonType {
  Edit = 'edit',
  Add = 'add',
}

export interface ModalButtonProps {
  type: ButtonType;
  title: string;
  description?: string;
  modalContent: ComponentType;
  unsafeScreen?: boolean;
  params?: Record<string, unknown>;
}
