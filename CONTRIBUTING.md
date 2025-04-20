# Contributing to Bolt

Thank you for your interest in contributing to this project! This guide will help you get set up and submit your changes.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Cloning the Repository](#cloning-the-repository)
- [Installing Dependencies](#installing-dependencies)
- [Running the Project](#running-the-project)
- [Running Tests](#running-tests)
- [Code Style](#code-style)
- [Branching and Commits](#branching-and-commits)
- [Pull Requests](#pull-requests)
- [Reporting Issues](#reporting-issues)
- [Code of Conduct](#code-of-conduct)

## Prerequisites
- Node.js >= 16
- npm (comes with Node.js) or Yarn
- Git

## Cloning the Repository
```bash
git clone https://github.com/vishveshjain/project.git
cd project
```

## Installing Dependencies
Install root (client) dependencies:
```bash
npm install
```
Install server dependencies:
```bash
cd server
npm install
cd ..
```

## Running the Project
Start the development server:
```bash
npm run dev
```
This should launch the client at `http://localhost:3000` and server at `http://localhost:4000` (if separate).

## Running Tests
```bash
npm test
```

## Code Style
- Format code with Prettier:
  ```bash
  npm run format
  ```
- Lint code with ESLint:
  ```bash
  npm run lint
  ```

## Branching and Commits
- Create feature branches from `main`:
  ```bash
  git checkout main
  git pull
  git checkout -b feature/my-feature
  ```
- Write clear, descriptive commit messages.

## Pull Requests
1. Push your branch:
   ```bash
   git push origin feature/my-feature
   ```
2. Open a Pull Request on GitHub.
3. Describe your changes and link any related issues.

## Reporting Issues
Open an issue at https://github.com/vishveshjain/project/issues and provide:
- A clear description
- Steps to reproduce
- Any relevant logs or screenshots

## Code of Conduct
This project follows the [Contributor Covenant](https://www.contributor-covenant.org/). Please be respectful to other contributors.
