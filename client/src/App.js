// App.js
// -------------------------------------------------------------
// This file defines the main application structure and routes.
// It uses React Router to navigate between the Search page,
// User Details page, and Repo Details page.
// -------------------------------------------------------------

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Page components
import SearchPage from "./pages/SearchPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import RepoDetailsPage from "./pages/RepoDetailsPage";

// Main stylesheet
import "./App.css";

function App() {
  return (
    // Router enables page navigation without refreshing the browser
    <Router>
      <div className="app-container">
        {/* Application title displayed at the top */}
        <h1>GitHub Explorer</h1>

        {/* Define all available application routes */}
        <Routes>
          {/* Home / Search page (default route) */}
          <Route path="/" element={<SearchPage />} />

          {/* User details page using :username as a URL parameter */}
          <Route path="/user/:username" element={<UserDetailsPage />} />

          {/* Repo details page using both owner and repo name parameters */}
          <Route path="/repo/:owner/:repo" element={<RepoDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// Export the App component so it can be rendered in index.js
export default App;
