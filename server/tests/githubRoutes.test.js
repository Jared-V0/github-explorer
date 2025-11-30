const request = require("supertest");
const app = require("../server");
const githubService = require("../services/githubService");

jest.mock("../services/githubService");

describe("GitHub routes", () => {
  test("GET /api/github/search returns data", async () => {
    const mockData = { total_count: 1, items: [{ login: "testuser" }] };
    githubService.searchUsers.mockResolvedValue(mockData);

    const res = await request(app)
      .get("/api/github/search")
      .query({ username: "test" });

    expect(res.statusCode).toBe(200);
    expect(res.body.items[0].login).toBe("testuser");
  });
});
