import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

export enum TabNames {
  Home = 'Home',
  Profile = 'Profile',
  Submit = 'Submit',
}

export interface EnhancedBottomTabBarProps extends BottomTabBarProps {
  theme: string;
}
