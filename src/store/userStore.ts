import create from "zustand";
import { Repository, User } from "../model/User";

interface UserState {
  users: User[];
  currentQuery: string;
  setUsers: (users: User[]) => void;
  setCurrentQuery: (query: string) => void;
  toggleUserSelected: (username: string) => void;
  setUserRepositories: (username: string, respositories: Repository[]) => void;
}

export const useStore = create<UserState>((set) => ({
  users: [],
  currentQuery: "",
  setCurrentQuery: (query: string) => {
    set(() => ({
      currentQuery: query,
    }));
  },
  setUsers: (users: User[]) => {
    set(() => ({
      users: users,
    }));
  },
  toggleUserSelected: (username: string) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.login === username
          ? { ...user, isSelected: !user.isSelected }
          : user
      ),
    }));
  },
  setUserRepositories: (username: string, repositories: Repository[]) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.login === username ? { ...user, repositories: repositories } : user
      ),
    }));
  },
}));
