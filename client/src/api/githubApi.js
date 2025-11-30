const API_BASE = "http://localhost:5000/api/github";

export async function searchUsers(username) {
  const res = await fetch(
    `${API_BASE}/search?username=${encodeURIComponent(username)}`
  );
  if (!res.ok) throw new Error("Failed to search users");
  return res.json();
}

export async function fetchUserDetails(username) {
  const res = await fetch(`${API_BASE}/users/${username}`);
  if (!res.ok) throw new Error("Failed to fetch user details");
  return res.json();
}

export async function fetchRepoDetails(owner, repo) {
  const res = await fetch(`${API_BASE}/repos/${owner}/${repo}`);
  if (!res.ok) throw new Error("Failed to fetch repo details");
  return res.json();
}
