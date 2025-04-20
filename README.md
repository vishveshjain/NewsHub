# NewsHub

A location-based news sharing platform built with React, TypeScript, Vite, Tailwind CSS, and a full-stack RESTful API using Express.js and MongoDB.

## Features
- Location-based, trending, and personalized news feeds
- Inline video playback with custom play button overlay
- Fallback to YouTube video thumbnails when no custom thumbnail is provided
- Option to play videos within the portal without redirecting
- Modular, component-driven architecture
- Responsive design with Tailwind CSS
- TypeScript type safety throughout
- Modern React features (hooks, context, error boundaries)
- Lucide React icons for a modern UI
- Full-stack RESTful APIs with Express.js and MongoDB

## Project Structure
```bash
NewsHub/
├── server/                  # Backend service
│   ├── models/              # Mongoose models
│   ├── routes/              # Express route handlers
│   ├── .env                 # Environment variables
│   ├── index.js             # Server entry point
│   └── package.json         # Backend dependencies
├── src/                     # Frontend source
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Button, Card, etc.
│   │   └── news/            # NewsCard, NewsGrid
│   ├── context/             # React contexts
│   ├── pages/               # Route pages (Home, NewsDetail, Contact)
│   ├── utils/               # Helpers and mock data
│   ├── types.ts             # TypeScript types
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── screenshots/             # Demo screenshots for README
├── package.json             # Frontend dependencies & scripts
├── vite.config.ts           # Vite config
├── tailwind.config.js       # Tailwind config
├── tsconfig.json            # TypeScript config
├── README.md                # Project documentation
└── LICENSE                  # License file
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm (v8+)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd NewsHub
   ```
2. Install frontend dependencies:
   ```sh
   npm install
   ```
3. Install backend dependencies:
   ```sh
   cd server
   npm install
   cd ..
   ```

### Running the App
#### Start Backend
```sh
cd server
npm run dev
```

#### Start Frontend
```sh
npm run dev
```

App will be available at [http://localhost:5173](http://localhost:5173), API at http://localhost:5000/api

### Environment Variables
Create a `.env` file in `server/`:
```dotenv
MONGODB_URI=your_mongo_connection_string
PORT=5000
```

### Linting & Formatting
To check for lint errors and format code:
```sh
npm run lint
npm run format
```

## Technologies Used
**Frontend:**
- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- CORS & Morgan
- Nodemailer for email notifications

## Screenshots

### Home Page
<p align="center">
  <img src="./screenshots/home.jpg" alt="NewsHub Home Page" width="600"/><br>
  <em>Stay Connected to What Matters – Discover local and global news that impacts your world.</em>
</p>


### Submit News Page
<p align="center">
  <img src="./screenshots/submit-news.png" alt="NewsHub Submit News" width="600"/><br>
  <em>Submit important stories with the community using a simple, guided form.</em>
</p>

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
