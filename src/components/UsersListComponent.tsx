import { useState } from "react";
import { Repository, User } from "../model/User";
import { listUserRepos } from "../services/github";
import { useStore } from "../store/userStore";
import RepositoryComponent from "./RepositoryComponent";

interface RepoApiItem {
  name: string;
  description: string;
  stargazers_count: string;
}

type UserLoading = {
  login: string;
  isLoading: boolean;
};

const UsersListComponent = () => {
  const { users, toggleUserSelected, setUserRepositories } = useStore();

  return (
    <div className="p-3 w-full flex flex-col gap-1">
      {users.map(({ login, isSelected, repositories }: User, index: number) => (
        <div key={index}>
          <div
            onClick={async () => {
              let userRepos = await listUserRepos(login);
              let reposList = userRepos.data.map(
                ({ name, description, stargazers_count }: RepoApiItem) => {
                  return {
                    name,
                    description,
                    starsCount: stargazers_count,
                  };
                }
              );
              setUserRepositories(login, reposList);
              toggleUserSelected(login);
            }}
            className="flex flex-row justify-between bg-gray-200 p-1"
          >
            {login}
            <div className="pt-1">
              {isSelected ? (
                <svg version="1.1" width="15" height="15" viewBox="0 0 256 256">
                  <defs></defs>
                  <g transform="rotate(180 128 128) translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path
                      d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              ) : (
                <svg version="1.1" width="15" height="15" viewBox="0 0 256 256">
                  <defs></defs>
                  <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                    <path
                      d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z"
                      transform=" matrix(1 0 0 1 0 0) "
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 py-1 content-end items-end">
            {isSelected ? (
              repositories.map((repository: Repository, index: number) => (
                <RepositoryComponent key={index} repository={repository} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersListComponent;
