import {ReactNode} from 'react';

export interface ImagePickerProps {
  onSelectImage: (file: unknown) => void;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}
