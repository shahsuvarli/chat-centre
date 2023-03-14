import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAO1yYEMZOyiyCPyPxFkI-g656wJMlm5fc",
  authDomain: "whatsapp-clone-25ac6.firebaseapp.com",
  projectId: "whatsapp-clone-25ac6",
  storageBucket: "whatsapp-clone-25ac6.appspot.com",
  messagingSenderId: "771038184294",
  appId: "1:771038184294:web:799d89c013240f92da3ea7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)
