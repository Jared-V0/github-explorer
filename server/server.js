const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const githubRoutes = require("./routes/githubRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
  res.json({ message: "GitHub Explorer API is running" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app; // for tests
