import {ModalContent} from '@/app/context/modalContext/types';

export interface ModalProps {
  data: ModalContent | null;
  hide: () => void;
  isVisible: boolean;
}
