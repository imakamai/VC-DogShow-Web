# Dog Show - Frontend

This is the client-side (Frontend) of the **Dog Show** application, developed in **React** using **TypeScript**.

## Technologies

*   **React**
*   **TypeScript**
*   **Tailwind CSS** (for styling)
*   **Axios** (for API communication)
*   **React Router** (for navigation)

## Project Structure

*   `src/pages`: Main application pages (Login, Home, Profile, Competitions...).
*   `src/components`: Reusable components (Navbar, Footer, etc.).
*   `src/services`: API client (`api.ts`).
*   `src/context`: AuthContext and ThemeContext.

## Getting Started

### 1. Install Dependencies
Before the first run, install all necessary packages:
```bash
npm install
```

### 2. Run in Development Mode
To run the application locally:
```bash
npm start
```
The application will be available at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

## Connecting to Backend
The application expects the Backend server to be running. Check `src/services/api.ts` (or `.env` file) to confirm the backend server URL (defaults often to `http://localhost:5000/api`).

## Features
*   Registration and Login (JWT)
*   User Profile (Add dogs)
*   View and Apply for Competitions
*   Admin and Manager Dashboards
