# GitHub Explorer

GitHub Explorer is a full-stack web application that allows users to search for GitHub profiles, view detailed user information, browse repositories, and inspect repository details including the latest commits.

The project is built using a React frontend and an Express backend, communicating with the GitHub API through a secure server-side integration.

---

##  Features

###  Search GitHub Users
Users can enter a username and retrieve matching GitHub accounts using the GitHub Search API.

###  User Details Page
Displays:
- Username  
- Avatar  
- Bio  
- Followers / Following  
- Link to full GitHub profile  
- List of repositories  

###  Repository Details Page
Shows:
- Repo description  
- Creation date  
- Last updated date  
- External GitHub link  
- Last **5 commit messages**, authors, and timestamps  

### Backend API With Token Authentication
The backend uses an environment variable (`.env`) to authenticate requests with the GitHub API, increasing rate limits and preventing 403 errors.

---

##  Tech Stack

### Frontend
- :contentReference[oaicite:0]{index=0}  
- React Router  
- Fetch/Axios (via custom API wrapper)

### Backend
- :contentReference[oaicite:1]{index=1}  
- :contentReference[oaicite:2]{index=2}  
- Axios  
- Dotenv for environment variables

### Testing
- Jest  
- React Testing Library  
- Supertest for backend tests

---

##  Project Structure
github-explorer/
│
├── client/ # React frontend
│ ├── src/
│ │ ├── pages/ # SearchPage, UserDetailsPage, RepoDetailsPage
│ │ ├── components/ # UserCard, SearchBar, LoadingSpinner
│ │ ├── api/ # Frontend API wrapper (githubApi.js)
│ │ └── App.js
│ └── package.json
│
├── server/ # Express backend
│ ├── routes/ # Route definitions
│ ├── services/ # GitHub API service logic
│ ├── tests/ # Jest + Supertest backend tests
│ ├── server.js
│ ├── .gitignore
│ └── package.json
│
└── README.md


---

##  Installation & Setup

### 1. Clone the repository

git clone https://github.com/YOUR_USERNAME/github-explorer.git

cd github-explorer


---

##  Backend Setup (Express)

cd server
npm install

### Create `.env` file inside `/server`:

GITHUB_TOKEN=your_github_personal_access_token


### Start backend server:

npm run dev

Server runs on:
http://localhost:5000


---

##  Frontend Setup (React)

cd client
npm install
npm start


Frontend runs on:

http://localhost:3000


---

##  Running Tests

### Backend Tests
Run inside `/server`:
npm test


---

##  Environment Variables

The `.env` file must **never** be committed.  
Your server's `.gitignore` should contain:
node_modules/
.env


---

##  Deployment

You can deploy:

- Backend → Render, Railway, Heroku  
- Frontend → Netlify, Vercel, GitHub Pages (build-only)

The frontend must point to your hosted backend API.

---

##  License

This project is for academic use as part of a full-stack development coursework submission.

---

##  Acknowledgements

- GitHub API  
- React  
- Express  
- Node.js  

## Author 

Jared Valensky

