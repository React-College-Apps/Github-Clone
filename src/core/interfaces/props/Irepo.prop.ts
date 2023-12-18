export interface IRepo {
  name: string;
  owner: {
    login: string;
  };
  stargazers_count: number;
  topics: string[];
  language?: string; 
}

export interface IRepoCardProps {
  repo: IRepo;
}

