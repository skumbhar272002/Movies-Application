# Movies-Application

A React-based movie review application that allows users to add, edit, and delete movie reviews.

## Live Demo

The application is deployed on GitHub Pages: [https://skumbhar272002.github.io/Movies-Application](https://skumbhar272002.github.io/Movies-Application)

## Features

- Add new movie reviews
- Edit existing reviews
- Delete reviews
- Data persistence using browser localStorage
- Responsive design

## Local Development

To run the application locally:

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

To create a production build:

```bash
cd client
npm run build
```

The build files will be generated in the `client/build/` directory.

## Deployment

This application is configured for GitHub Pages deployment. The built files are copied to the root directory to be served by GitHub Pages.

## Technologies Used

- React 19.1.1
- HTML5
- CSS3
- JavaScript (ES6+)
- localStorage for data persistence