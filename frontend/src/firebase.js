// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Replaced the configuration object from your Firebase console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
let app = null;
try {
  // Basic guard to avoid initializing with obviously missing values in dev
  if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.appId) {
    throw new Error('Missing Firebase configuration env vars');
  }
  app = initializeApp(firebaseConfig);
} catch (err) {
  // Avoid crashing the app; surface a friendly console error for configuration
  console.error('[Firebase] Initialization failed:', err?.message || err);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = app ? getAuth(app) : null;

// You can also export the 'app' instance if you need it elsewhere
export default app;