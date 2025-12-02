import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";

jest.mock("../components/SearchBar", () => {
  return function MockSearchBar() {
    return <input placeholder="Search GitHub users..." />;
  };
});

jest.mock("../components/LoadingSpinner", () => {
  return function MockLoadingSpinner() {
    return <div>Loading...</div>;
  };
});

// NEW: mock UserCard so tests don't break due to <Link> usage
jest.mock("../components/UserCard", () => {
  return function MockUserCard() {
    return <div>User Card</div>;
  };
});

test("renders search input", () => {
  render(
    <MemoryRouter>
      <SearchPage />
    </MemoryRouter>
  );

  const input = screen.getByPlaceholderText(/search github users/i);
  expect(input).toBeInTheDocument();
});
