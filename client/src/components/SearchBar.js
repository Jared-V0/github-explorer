// SearchBar.js
// -----------------------------------------------------------------------------
// This component provides the input field and button used to search for GitHub
// users. It collects the text entered by the user and sends it to the parent
// component (SearchPage) through the onSearch() callback.
// -----------------------------------------------------------------------------

import React, { useState } from "react";

function SearchBar({ onSearch }) {
  // Local state for storing the current value of the search input field
  const [value, setValue] = useState("");

  // ---------------------------------------------------------------------------
  // Handle form submission:
  // - Prevent default page refresh
  // - Ignore empty/whitespace-only values
  // - Call the parent's onSearch() function with the trimmed username
  // ---------------------------------------------------------------------------
  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return; // Prevent empty searches
    onSearch(value.trim()); // Trigger search request in parent component
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {/* Input where users type a GitHub username */}
      <input
        type="text"
        placeholder="Search GitHub users..."
        value={value}
        onChange={(e) => setValue(e.target.value)} // Update state on each keystroke
      />

      {/* Submit button triggers the handleSubmit() function */}
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
