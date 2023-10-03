import { createContext, useEffect, useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../../firebase";
const authContext = createContext();

export const AuthenticationContext = ({ children }) => {
  const [users, setUsers] = useState();
  const isAuthenticated = !!users; // Check if users state has a value
  function register(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    console.log("Register");
  }
  function login(email, password) {
    signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    signOut(auth);
  }
function signUpWithGoogle(){
  const googleAuthProvider=new GoogleAuthProvider();
  return signInWithPopup(auth,googleAuthProvider)
}
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsers(currentUser);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <authContext.Provider value={{ isAuthenticated,register, users, login, logOut,signUpWithGoogle }}>
      {children}
    </authContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(authContext);
}
