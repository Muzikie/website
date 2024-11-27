import {AUTH_PROVIDERS} from './constants';

export enum Routes {
  Home = '/',
  Feed = '/feed',
  Login = '/login',
  SignUp = '/signUp',
  Projects = '/projects',
  CreateProjects = '/projects/create',
  Profile = '/profile',
  Splash = '/splash',
  Settings = '/settings',
  Picture = '/picture',
  ContributionTiers = '/contribution-tiers',
  CreateContributionTier = '/contribution-tiers/create',
  Logout = '/logout',
}

export const privateRoutes = [
  Routes.Home,
  Routes.Feed,
  Routes.Projects,
  Routes.Profile,
  Routes.Picture,
];

export const LoginCallBackRoutes = AUTH_PROVIDERS.map(provider => `${Routes.Login}/${provider}`)
