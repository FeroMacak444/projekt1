//import 'firebase/firestore';
//import { useAuthState } from 'react-firebase-hooks/auth';
//import { useCollectionData } from 'react-firebase-hooks/firestore';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
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
    databaseURL: "https://kanban-board-52390-default-rtdb.europe-west1.firebasedatabase.app/"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
  }).catch((error) => {
    console.log(error);
  });
}

