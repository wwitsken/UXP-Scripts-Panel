import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Configure your Firebase environment
const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

// Initialize the app
const app = initializeApp(config);

// Get the storage for the initialized app
const storage = getStorage(app);

// Get the realtime database for the initialized app
const rtdb = getDatabase(app);

// Get the auth
const auth = getAuth(app);

export { app, storage, auth, rtdb };
