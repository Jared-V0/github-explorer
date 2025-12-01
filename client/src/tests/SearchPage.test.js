// SearchPage.test.js
// --------------------------------------------------------------------
// This test ensures that the SearchPage component renders correctly.
// Because SearchPage depends on SearchBar and LoadingSpinner components,
// we mock those components to isolate the test and avoid prop errors.
// --------------------------------------------------------------------

import React from "react";
import { render, screen } from "@testing-library/react";
import SearchPage from "../pages/SearchPage";

// -------------------------------------------------------------
// Mock the SearchBar component
// -------------------------------------------------------------
// The real SearchBar requires props and contains input logic.
// For this test, we replace it with a simple mocked input field
// to prevent prop-related errors and keep the test focused on
// checking whether the search input is rendered on the page.
jest.mock("../components/SearchBar", () => {
  return function MockSearchBar() {
    return <input placeholder="Search GitHub users..." />;
  };
});

// -------------------------------------------------------------
// Mock the LoadingSpinner component (optional)
// -------------------------------------------------------------
// SearchPage may show a loading indicator when fetching data.
// Mocking it keeps the test lightweight and prevents UI side effects.
jest.mock("../components/LoadingSpinner", () => {
  return function MockLoadingSpinner() {
    return <div>Loading...</div>;
  };
});

// -------------------------------------------------------------
// Main test: verifies that the search input appears on the page
// -------------------------------------------------------------
test("renders search input", () => {
  // Render the SearchPage component into the testing DOM
  render(<SearchPage />);

  // Search for the input element using its placeholder text
  const input = screen.getByPlaceholderText(/search github users/i);

  // Assert that the input element exists in the document
  expect(input).toBeInTheDocument();
});
