# Google CrUX Performance Metrics App

This application is a **React + Vite** app that interacts with the **Google Chrome User Experience Report (CrUX) API** to fetch performance metrics for specified website origins.  
The app allows users to filter the results and view them in a clean, tabular format.

## Features

- Fetches real-world performance metrics from the CrUX API
- Supports filtering by website origins
- Displays data in a table format
- Built with React and Vite for fast development and build times

## Running the Application

Follow these steps to run the application on your local machine:

1. **Clone the Repository**  
   Clone the project to your local machine using git:

   ```bash
   git clone <repository-url>
   cd <repository-folder>

2. **Install Dependencies**

   ```bash
    npm install
        or
    yarn install

3. **Start the Development Server**

   ```bash
    npm run dev
        or
    yarn dev

4. **Building for Production**

   ```bash
    npm run build
        or
    yarn build

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.