export interface IconProps {
  name: string;
  color?: string;
  size?: number;
  className?: string;
}

export interface IconsConfig {
  [key: string]: string[];
}
