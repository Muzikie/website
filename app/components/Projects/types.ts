import {ImageFormats, AccountAttrs} from '@/app/config/types';

interface User {
  id: number;
  email: string;
}

export type ImageData  = {
  id: number;
  formats: ImageFormats;
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
  soft_goal: string;
  deadline: string;
  hard_goal: string;
  users_permissions_user?: AccountAttrs;
}

export interface ProjectReadOnlyAttrs {
  publishedAt?: string;
  current_funding: string;
  reaction_count: number;
  users_permissions_user: User;
  images: ImageData[];
  project_status?: ProjectStatus;
  id: number;
  documentId: string;
}

export type Project = ProjectAttrs & ProjectReadOnlyAttrs;

export interface ProjectProps {
  item: Project;
}

export interface ContributionTierAttrs {
  name: string;
  description: string;
  rewards: string;
  amount: number;
  project: number;
}

export type ContributionTier = {
  id: number;
  documentId: string;
} & ContributionTierAttrs
