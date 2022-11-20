import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.REACT_APPGITHUB_ACCESS_TOKEN || "",
});
export const listUsers = async (name: string) => {
  return await octokit.request(
    "GET /search/users{?q,sort,order,per_page,page}",
    { q: name, sort: "asc", order: 5, per_page: 5, page: 1 }
  );
};
export const listUserRepos = async (login: string) => {
  return await octokit.request(
    "GET /users/{username}/repos{?type,sort,direction}",
    {
      username: login,
      type: "all",
      sort: "asc",
      direction: "asc",
    }
  );
};
