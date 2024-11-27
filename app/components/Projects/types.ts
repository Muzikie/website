import {ImageFormats} from '@/app/config/types';

interface User {
  data: {
    id: number;
    attributes: {
      email: string;
    };
  };
}

export interface ImageData {
  id: number;
  attributes: {
    formats: ImageFormats;
  };
}

interface Images {
  data: ImageData[];
}

export enum ProjectType {
  Single = 'single',
  EP = 'EP',
  Album = 'Album',
  MusicVideo = 'Music Video',
}

export enum ProjectStatus {
  Published = 'published',
  Draft = 'draft',
  Successful = 'successful',
  soldOut = 'soldOut',
  Failing = 'failing',
  Failed = 'failed',
  Withdrawn = 'withdrawn',
}

export interface ProjectAttrs {
  name: string;
  summary: string;
  description: string;
  project_type: ProjectType;
  planned_release_date: string;
  soft_goal: number | string;
  deadline: string;
  hard_goal: number | string;
  users_permissions_user?: User;
}

export interface ProjectReadOnlyAttrs {
  current_funding: number;
  reaction_count: number;
  users_permissions_user: User;
  images: Images;
  status?: ProjectStatus;
}

export interface Project {
  id: number;
  attributes: ProjectAttrs & ProjectReadOnlyAttrs;
}

export interface ProjectProps {
  item: Project;
}

export interface ContributionTierAttrs {
  name: string;
  description: string;
  rewards: string;
  amount: number;
}

export interface ContributionTier {
  id: number;
  attributes: ContributionTierAttrs;
}
