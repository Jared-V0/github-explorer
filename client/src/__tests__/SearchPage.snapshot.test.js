import React from "react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import SearchPage from "../pages/SearchPage";

// -------------------------------------------------------------
// Mock the SearchBar component
// -------------------------------------------------------------
jest.mock("../components/SearchBar", () => {
  return function MockSearchBar() {
    return <input placeholder="Search GitHub users..." />;
  };
});

// -------------------------------------------------------------
// Mock the LoadingSpinner
// -------------------------------------------------------------
jest.mock("../components/LoadingSpinner", () => {
  return function MockLoadingSpinner() {
    return <div>Loading...</div>;
  };
});

// -------------------------------------------------------------
// Mock the UserCard component (prevents <Link> router issues)
// -------------------------------------------------------------
jest.mock("../components/UserCard", () => {
  return function MockUserCard() {
    return <div>User Card</div>;
  };
});

// -------------------------------------------------------------
// Snapshot Test
// -------------------------------------------------------------
test("SearchPage matches snapshot", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
