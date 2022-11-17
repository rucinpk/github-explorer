export interface Repository {
  name: string;
  description: string;
  starsCount: string; //stargazers_count
}

export interface User {
  id: number;
  login: string;
  isSelected: boolean;
  repositories: Repository[];
}
