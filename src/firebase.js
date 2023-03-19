import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfOAwu1MW6XLRDYdwGPHc7bfCBcMNeDZo",
  authDomain: "whatsapp-clone-831b6.firebaseapp.com",
  projectId: "whatsapp-clone-831b6",
  storageBucket: "whatsapp-clone-831b6.appspot.com",
  messagingSenderId: "741903692077",
  appId: "1:741903692077:web:c4963aefec9a231d1a23a4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
