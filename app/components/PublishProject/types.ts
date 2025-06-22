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
  projectId: string;
  onchainId: string;
}