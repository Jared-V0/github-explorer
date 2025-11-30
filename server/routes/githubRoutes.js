const express = require("express");
const {
  searchUsers,
  getUserDetails,
  getRepoDetails,
} = require("../services/githubService");

const router = express.Router();

// GET /api/github/search?username=someName
router.get("/search", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res
        .status(400)
        .json({ error: "username query param is required" });
    }
    const data = await searchUsers(username);
    res.json(data);
  } catch (error) {
    console.error("Error searching users:", error.message);
    res.status(500).json({ error: "Failed to search users" });
  }
});

// GET /api/github/users/:username
router.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const data = await getUserDetails(username);
    res.json(data);
  } catch (error) {
    console.error("Error getting user details:", error.message);
    res.status(500).json({ error: "Failed to get user details" });
  }
});

// GET /api/github/repos/:owner/:repo
router.get("/repos/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const data = await getRepoDetails(owner, repo);
    res.json(data);
  } catch (error) {
    console.error("Error getting repo details:", error.message);
    res.status(500).json({ error: "Failed to get repo details" });
  }
});

module.exports = router;
