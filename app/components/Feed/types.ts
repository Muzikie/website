interface User {
  id: string;
  email: string;
}

interface Owner {
  first_name: string;
  last_name: string;
  user_id: number;
  profile_id: number;
}

export interface Image {
  id: number;
  documentId: string;
  formats: {
    large: {
      url: string;
      name: string;
    };
    medium: {
      url: string;
      name: string;
    };
    small: {
      url: string;
      name: string;
    };
    thumbnail: {
      url: string;
      name: string;
    };
  };
}

interface Images {
  data: Image[];
}

export enum ProjectType {
  Single = 'single',
  EP = 'ep',
  Album = 'album',
  MusicVideo = 'music_video',
}

export enum ProjectStatus {
  Live = 'live',
  Draft = 'draft',
  Successful = 'successful',
  Failed = 'failed',
}

export enum FeedType {
  Project = 'project',
  Content = 'content',
}

export interface ProjectAttrs {
  name: string;
  summary: string;
  description: string;
  project_type: ProjectType;
  planned_release_date: string;
  soft_goal: number;
  deadline: string;
  hard_goal: number;
}

export interface ArtistProps {
  data: Owner;
}

export interface ExclusiveContentAttrs {
  media: unknown;
  project: string;
  public_access: boolean;
  accessibleTiers: string[];
  title: string;
  description: string;
}

export type Project = ProjectAttrs & {
  id: number;
  documentId: string;
  current_funding: string;
  reaction_count: number;
  users_permissions_user: User;
  images: Images;
  owner: Owner;
  type: FeedType.Project;
}

export interface ProjectProps {
  data: Project;
}

export type Content = ExclusiveContentAttrs & {
  id: number;
  reaction_count: number;
  owner: Owner;
  project: {
    name: string;
    id: number;
    documentId: string;
  };
  type: FeedType.Content;
}

export interface ContentProps {
  data: Content;
}

export interface ContributionTierAttrs {
  name: string;
  description: string;
  rewards: string;
  amount: number;
}

export interface LinkToProjectProps {
  name: string;
  id: string;
}

export interface MetaProps {
  reactionCount?: number;
  backers?: number;
  type: FeedType;
  status?: ProjectStatus;
}

export interface FeedProps {
  data: {
    data: (Project | Content)[];
  };
  isLoading?: boolean;
}