import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//exporta la funcionalidad de la DB
export const firestore = firebase.firestore()
//Exporta el paquete de firebase para poder usarlo
export default firebase