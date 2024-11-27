export interface IconButtonProps {
  onPress: () => void;
  iconSize: number;
  iconName: string;
  iconColor?: string;
  className?: string;
  disabled?: boolean;
}
