// SearchPage.js
// -----------------------------------------------------------------------------
// This page allows users to search for GitHub profiles by username.
// It communicates with the backend API, displays loading and error states,
// and renders a list of matching users using the UserCard component.
// -----------------------------------------------------------------------------

import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { searchUsers } from "../api/githubApi";

function SearchPage() {
  // Store the list of GitHub users returned from the API
  const [results, setResults] = useState([]);

  // Track whether an API request is currently in progress
  const [loading, setLoading] = useState(false);

  // Store error messages (e.g., network issues, rate limits)
  const [error, setError] = useState("");

  // ---------------------------------------------------------------------------
  // handleSearch() is passed to the SearchBar component.
  // It receives the username entered by the user and fetches matching GitHub
  // profiles through the backend API.
  // ---------------------------------------------------------------------------
  async function handleSearch(username) {
    try {
      setLoading(true); // Show loading spinner
      setError(""); // Clear any previous errors

      // Call backend function which fetches GitHub users
      const data = await searchUsers(username);

      // GitHub returns results in data.items → store in state
      setResults(data.items || []);
    } catch (err) {
      // Generic error message shown to the user
      setError("Could not fetch users.");
    } finally {
      // Hide loading spinner when request is finished
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Search bar component triggers handleSearch() when submitted */}
      <SearchBar onSearch={handleSearch} />

      {/* Loading indicator shown while fetching data */}
      {loading && <LoadingSpinner />}

      {/* Display error message if request fails */}
      {error && <p className="error">{error}</p>}

      {/* Render a list of GitHub user cards */}
      <div className="user-list">
        {results.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
