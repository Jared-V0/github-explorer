const axios = require("axios");

const GITHUB_BASE_URL = "https://api.github.com";

async function searchUsers(username) {
  const response = await axios.get(`${GITHUB_BASE_URL}/search/users`, {
    params: { q: username },
  });
  return response.data; // includes items[]
}

async function getUserDetails(username) {
  const [userRes, reposRes] = await Promise.all([
    axios.get(`${GITHUB_BASE_URL}/users/${username}`),
    axios.get(`${GITHUB_BASE_URL}/users/${username}/repos`, {
      params: { sort: "updated", per_page: 10 },
    }),
  ]);

  return {
    user: userRes.data,
    repos: reposRes.data,
  };
}

async function getRepoDetails(owner, repo) {
  const [repoRes, commitsRes] = await Promise.all([
    axios.get(`${GITHUB_BASE_URL}/repos/${owner}/${repo}`),
    axios.get(`${GITHUB_BASE_URL}/repos/${owner}/${repo}/commits`, {
      params: { per_page: 5 },
    }),
  ]);

  return {
    repo: repoRes.data,
    commits: commitsRes.data,
  };
}

module.exports = {
  searchUsers,
  getUserDetails,
  getRepoDetails,
};
