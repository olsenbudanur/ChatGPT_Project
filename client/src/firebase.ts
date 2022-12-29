// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

let API_KEY="AIzaSyDGUU6Sq6D2Ws21WXqsgqbmkTI25DEYbxA",
AUTH_DOMAIN="tutanaai-19ce4.firebaseapp.com",
PROJECT_ID="tutanaai-19ce4",
STORAGE_BUCKET="tutanaai-19ce4.appspot.com",
MESSAGE_SENDER_ID="87517054477",
APP_ID="1:87517054477:web:cfcce21e35c36dc06d3744"

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGE_SENDER_ID,
    appId: APP_ID
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;