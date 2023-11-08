//import 'firebase/firestore';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBE2vBqsm44PPnFjz0ielE8TwKE-ERbe9g",
    authDomain: "kanban-board-52390.firebaseapp.com",
    projectId: "kanban-board-52390",
    storageBucket: "kanban-board-52390.appspot.com",
    messagingSenderId: "497239140528",
    appId: "1:497239140528:web:94bf422d94857dc1837375",
    measurementId: "G-S5G8F5DPSS",
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}

export const db = getFirestore(app);