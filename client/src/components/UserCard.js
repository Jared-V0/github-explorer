// UserCard.js
// -----------------------------------------------------------------------------
// This component displays a single GitHub user inside a styled card.
// It shows the user’s avatar, username, an internal link to the user details
// page, and an external link to the GitHub profile.
// This component is used inside the SearchPage to display search results.
// -----------------------------------------------------------------------------

import React from "react";
import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <div className="user-card">
      {/* User avatar image */}
      <img src={user.avatar_url} alt={user.login} />

      {/* GitHub username */}
      <h3>{user.login}</h3>

      {/* Internal navigation link to the user details page */}
      <Link to={`/user/${user.login}`}>View profile</Link>

      {/* External GitHub link (styled separately in CSS) */}
      <a
        className="external-link"
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        View on GitHub
      </a>
    </div>
  );
}

export default UserCard;
