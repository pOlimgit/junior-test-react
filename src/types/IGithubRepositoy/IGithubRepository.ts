//Data model API
export interface IGitHubRepository {
  id: string;
  full_name: string;
  owner: {
    login: string;
  };
}
