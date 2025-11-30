// UserDetailsPage.js
// -----------------------------------------------------------------------------
// This page displays detailed information for a selected GitHub user.
// It shows the user's profile information (avatar, bio, followers, etc.)
// and lists the user's most recently updated repositories.
// Data is fetched from the backend API using the username from the URL.
// -----------------------------------------------------------------------------

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserDetails } from "../api/githubApi";
import LoadingSpinner from "../components/LoadingSpinner";

function UserDetailsPage() {
  // Extract the "username" parameter from the URL (e.g., /user/octocat)
  const { username } = useParams();

  // State variables for storing user data, loading state, and error state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // Fetch user details when the component loads or when the username changes
  // ---------------------------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        setLoading(true); // Start loading indicator

        // Fetch user information + their list of repositories
        const res = await fetchUserDetails(username);
        setData(res);
      } catch (err) {
        // Display user-friendly error if request fails
        setError("Could not load user details.");
      } finally {
        setLoading(false); // Hide loading spinner
      }
    }

    load();
  }, [username]);

  // ---------------------------------------------------------------------------
  // Handle loading and error states before rendering the main UI
  // ---------------------------------------------------------------------------
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error">{error}</p>;
  if (!data) return null; // Prevent rendering when data is unexpectedly empty

  // Extract user profile information and repository list from API response
  const { user, repos } = data;

  return (
    <div className="user-details">
      {/* User login name */}
      <h2>{user.login}</h2>

      {/* User avatar */}
      <img src={user.avatar_url} alt={user.login} />

      {/* User bio */}
      <p>{user.bio}</p>

      {/* Followers and following statistics */}
      <p>
        Followers: {user.followers} | Following: {user.following}
      </p>

      {/* External GitHub profile link */}
      <a
        className="external-link"
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        View full profile on GitHub
      </a>

      {/* List of repositories */}
      <h3>Repositories</h3>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id} className="repo-card">
            {/* Internal link to the Repo Details page */}
            <Link to={`/repo/${user.login}/${repo.name}`}>{repo.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetailsPage;
