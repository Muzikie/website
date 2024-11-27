import {ReactNode} from 'react';

export interface SafeAreaProps {
  children: ReactNode;
  safeArea?: boolean;
  className?: string;
}
