import { create } from "zustand";

type Repository = {
  created_at: string;
  description: string;
  forks_count: number;
  language: string;
  homepage: string;
  html_url: string;
  id: string;
  name: string;
  open_issues_count: number;
  owner: {
    html_url: string;
    login: string;
  };
  pushed_at: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  watchers_count: number;
};

type SearchResponse = {
  total_count: number;
  items: Repository[];
};

type Output = {
  data: SearchResponse;
  fetch: (search: string) => void;
  isLoading: boolean;
};

export const useRepositoriesStore = create<Output>((set) => ({
  data: {
    items: [],
    total_count: 0,
  },
  fetch: async (search: string): Promise<void> => {
    set({ isLoading: true });
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${search}`,
    );
    const data = await response.json();
    set({ data, isLoading: false });
  },
  isLoading: false,
}));
