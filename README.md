# How to Run the App

This guide will walk you through running both the backend and frontend of the application.

## Prerequisites
- Make sure you have **Node.js** and **npm** (Node Package Manager) installed. You can download them [here](https://nodejs.org/).
- Install project dependencies using `npm install` both in the `backend` and root (frontend) directories.

## Running the Backend

1. **Navigate to the Backend Directory**:
   - Open a terminal and navigate to the backend folder by running the following command:
     ```sh
     cd backend
     ```

2. **Install Dependencies**:
   - Before starting the backend, install the required dependencies:
     ```sh
     npm install
     ```

3. **Start the Backend Server**:
   - Start the backend by running:
     ```sh
     npm start
     ```
   - The backend should now be running, typically on `http://localhost:8004` (or the port specified in your backend configuration).

## Running the Frontend

1. **Open a New Terminal**:
   - Open a new terminal window or tab.

2. **Navigate to the Root Directory**:
   - Ensure you are in the root directory of the project. If not, navigate to the project root.

3. **Install Dependencies**:
   - Run the following command to install the necessary dependencies for the frontend:
     ```sh
     npm install
     ```

4. **Start the Frontend**:
   - Start the frontend application by running:
     ```sh
     npm start
     ```
   - The frontend should now be running, typically on `http://localhost:3000`.

## Summary
- The backend server needs to be running before the frontend, as the frontend makes API requests to it.
- Open two terminal windows: 
  - In the first terminal, navigate to `backend` and run the backend server.
  - In the second terminal, navigate to the project root and run the frontend server.

## Troubleshooting
- **Port Conflicts**: Make sure that no other processes are using the backend or frontend ports (typically 8004 for backend and 3000 for frontend).
- **Dependencies Not Installed**: If you face errors about missing packages, make sure you’ve run `npm install` in both the backend and frontend directories.

## Useful Commands
- **Stop Running Servers**: To stop either the backend or frontend server, press `CTRL + C` in the respective terminal.
- **Installing Dependencies**: 
  - Always run `npm install` before starting the servers to ensure all required dependencies are available.
