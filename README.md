# Shodh-a-Code
*Shodh-a-Code* is a full-stack web platform designed for hosting and attempting coding contests.  
It demonstrates complete frontend-backend integration, basic routing, and data rendering using React and Express.js.
## Tech Stack
Layer : Technology Used 
Frontend :React.js, React Router DOM, CSS 
Backend :Node.js, Express.js 
Styling : Custom CSS 
Data : Local JSON (Mock Data) 
## ⚙️ Setup Instructions
### 1️ Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd server
2. Install dependencies:
npm install
3. Start the backend server
npm start
The backend runs at:
http://localhost:5000

### 2️ Frontend Setup
1. Navigate to the frontend folder:
cd client
2. Install dependencies:
npm install
3. Start the React app:
npm start
4. The frontend runs at:
http://localhost:3000

## API Design
GET /api/contests
Fetch all available contests.
[
  {
    "id": 1,
    "name": "Binary Search Challenge",
    "difficulty": "Medium",
    "questions": [
      { "id": 101, "title": "Find Peak Element" },
      { "id": 102, "title": "Search in Rotated Array" }
    ]
  }
]
GET /api/contests/:id

Fetch a single contest with its related questions.

Sample Response:

{
  "id": 1,
  "name": "Binary Search Challenge",
  "difficulty": "Medium",
  "questions": [
    { "id": 101, "title": "Find Peak Element", "description": "..." },
    { "id": 102, "title": "Search in Rotated Array", "description": "..." }
  ]
}

## Design Choices & Justification
1. Backend Architecture
Developed with Express.js for fast, minimal REST API setup.
Contest data stored in a local JSON object, keeping setup simple and dependency-free.
Separate routes created for listing contests and fetching individual contest details.
2. Frontend Architecture
Built using React functional components for modularity and clarity.
React Router DOM enables clean navigation between pages (Home, ContestPage, and ProblemPage).
State handled using useState and useEffect hooks — simple yet efficient for this app scale.
Custom App.css provides a minimal yet visually appealing design.
3. Design Goals
Keep setup friction-free — no external database or Docker needed.
Maintain a clear separation between frontend and backend logic.
Ensure UI remains responsive, readable, and beginner-friendly.

## Challenges & Trade-offs
Data handling: Added fallback conditions to prevent runtime errors when API data was undefined.
UI consistency: Used CSS styling for speed instead of Tailwind (setup issues on system).
Scalability trade-off: For simplicity, JSON replaced real database connectivity.

# Author
Liza Sareen
Built with 💙 for the Shodh-a-Code project
Focused on clarity, clean code, and seamless full-stack integration.

📁 Folder Structure
shodh-a-code/
│
├── client/               # React Frontend
│   ├── src/
│   │   ├── App.js
│   │   ├── Home.js
│   │   ├── ContestPage.js
│   │   └── ProblemPage.js
│   └── package.json
│
└── server/               # Node.js Backend
    ├── index.js
    ├── contestsData.json
    └── package.json

# How to Run
Start backend:
cd server && npm start
Start frontend (in a new terminal):
cd client && npm start
Visit http://localhost:3000
 to view the site.
 Preview
 Home → Lists all contests
 Contest Page → Displays contest details and questions
 Problem Page → Placeholder for individual question solving
© 2025 Shodh-a-Code | Built by Liza Sareen
