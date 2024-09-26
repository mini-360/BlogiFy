import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXuvHYVLVXROsRqp5wPvCPP4CykpxBAYA",
  authDomain: "blogify-c4292.firebaseapp.com",
  projectId: "blogify-c4292",
  storageBucket: "blogify-c4292.appspot.com",
  messagingSenderId: "986713959109",
  appId: "1:986713959109:web:6048ced078580339ae5eac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;
  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });
  return user;
};
