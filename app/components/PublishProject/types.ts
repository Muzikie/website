export interface PublishProjectProps {
  data: {
    project_name: string;
    project_summary: string;
    artist_name: string;
    [key: `contribution_tier_#${number}`]: {
      name: string;
      amount: string;
    }
  };
  projectId: number;
  onPublish: (projectId: number) => Promise<{
    success: boolean;
    error: string;
  }>
}