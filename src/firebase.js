import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyD3Ijz6w_iET9a_FZhmXvtSR0qMCc1EoU4",
  authDomain: "recuerdoviajero-1fad3.firebaseapp.com",
  projectId: "recuerdoviajero-1fad3",
  storageBucket: "recuerdoviajero-1fad3.appspot.com",
  messagingSenderId: "75747081677",
  appId: "1:75747081677:web:d53c853de794de07541884",
  measurementId: "G-TVXPXSYK0Q",
};

// Initialize Firebase
const app = initializeApp(config);

const db = getFirestore(app);
export default db;
