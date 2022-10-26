// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFPF1JQQWK_MY2fTv5wLaWDPAvCRMjHIM",
  authDomain: "digitalent-a38f2.firebaseapp.com",
  projectId: "digitalent-a38f2",
  storageBucket: "digitalent-a38f2.appspot.com",
  messagingSenderId: "1005289713758",
  appId: "1:1005289713758:web:7dd5db83f0be06684044cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };