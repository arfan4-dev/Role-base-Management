import { initializeApp } from "firebase/app";
import {getAuth,deleteUser } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyCooiZcJvUEdIoBOaZUOsIugwMzPY50Prg",
  authDomain: "role-base-management.firebaseapp.com",
  projectId: "role-base-management",
  storageBucket: "role-base-management.appspot.com",
  messagingSenderId: "224390825142",
  appId: "1:224390825142:web:775ca61e86631dbb395217"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = getFirestore(app); // Create a Firestore instance
// export const userDelete= deleteUser(app)
export default app