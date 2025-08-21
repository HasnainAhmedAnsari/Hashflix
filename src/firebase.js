import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , getAuth, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBJi5enEV2G1xy0hnM2KPVzcDQrD_QiVKY",
  authDomain: "hashflix-13d13.firebaseapp.com",
  projectId: "hashflix-13d13",
  storageBucket: "hashflix-13d13.firebasestorage.app",
  messagingSenderId: "998282329946",
  appId: "1:998282329946:web:68e471f98bf8597e2d7d63"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
     const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        email,
        authProvider: "local",
  })
  } catch (error) {
    console.error("Error signing up:", error);
    toast.error(error.code.split('/')[1].split('-').join(" ")); // Format error message
  }
}

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () => {
  signOut(auth);
}

export { auth, db, signup, login, logout };