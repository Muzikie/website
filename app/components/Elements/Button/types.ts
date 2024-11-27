export enum ButtonThemes {
  primary = 'primary',
  secondary = 'secondary',
}

export interface ButtonProps {
  onPress?: () => void;
  theme?: ButtonThemes;
  title: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  shadow?: boolean;
  disabled?: boolean;
}
