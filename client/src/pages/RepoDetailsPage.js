// RepoDetailsPage.js
// -----------------------------------------------------------------------------
// This page displays detailed information about a selected GitHub repository.
// It shows the repository metadata (description, creation date, last update date)
// along with the latest 5 commits. All data is fetched from the backend API,
// which communicates with GitHub's API.
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRepoDetails } from "../api/githubApi";
import LoadingSpinner from "../components/LoadingSpinner";

function RepoDetailsPage() {
  // Extract dynamic URL parameters: owner and repository name
  const { owner, repo } = useParams();

  // State variables for storing fetched repo data, loading status, and errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // Fetch repository details whenever the "owner" or "repo" values change
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function loadRepo() {
      try {
        setLoading(true);
        // Call backend function that fetches repo info + last 5 commits
        const repoData = await fetchRepoDetails(owner, repo);
        setData(repoData); // Store API result
      } catch (err) {
        // If an error occurs (e.g., rate limits, invalid repo), show message
        setError("Failed to load repository details.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    }

    loadRepo();
  }, [owner, repo]);

  // ---------------------------------------------------------------------------
  // Conditional rendering for loading or error states
  // ---------------------------------------------------------------------------
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">{error}</p>;
  if (!data) return null; // Prevent rendering if data is missing unexpectedly

  // Destructure the repo info and commits array from backend response
  const { repo: repoInfo, commits } = data;

  return (
    <div className="repo-details">
      {/* Repository full name (owner/repo) */}
      <h2>{repoInfo.full_name}</h2>

      {/* Repository description (fallback if none included) */}
      <p>
        <strong>Description:</strong>{" "}
        {repoInfo.description || "No description provided."}
      </p>

      {/* Important timestamps */}
      <p>
        <strong>Created:</strong>{" "}
        {new Date(repoInfo.created_at).toLocaleString()}
      </p>
      <p>
        <strong>Last Updated:</strong>{" "}
        {new Date(repoInfo.updated_at).toLocaleString()}
      </p>

      {/* External link to GitHub repo page */}
      <p>
        <a
          href={repoInfo.html_url}
          target="_blank"
          rel="noreferrer"
          className="external-link"
        >
          View on GitHub
        </a>
      </p>

      {/* Commit section header */}
      <h3>Last 5 Commits</h3>

      {/* Fallback if repository has no commits */}
      {commits.length === 0 && <p>No commits found.</p>}

      {/* Render each commit inside styled list boxes */}
      <ul>
        {commits.map((commit) => (
          <li key={commit.sha} className="commit-item">
            <p>
              <strong>Message:</strong> {commit.commit.message}
            </p>
            <p>
              <strong>Author:</strong> {commit.commit.author.name}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(commit.commit.author.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>

      {/* Navigation back to the user details page */}
      <Link to={`/user/${owner}`}>← Back to User</Link>
    </div>
  );
}

export default RepoDetailsPage;
