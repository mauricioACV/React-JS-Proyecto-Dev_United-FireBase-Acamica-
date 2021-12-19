import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
//exporta la funcionalidad de la DB
export const firestore = firebase.firestore()

//exporta la funcionalidad de auth
//módulo de autenticación
export const auth = firebase.auth();
//proveedor de autenticación
export const provider = new firebase.auth.GoogleAuthProvider();
//utilidad para hacer login con ventana emergente
export const loginWithGoogle = () => auth.signInWithPopup(provider);
//utilidad para hacer logout
export const logout = () => auth.signOut();

//Exporta el paquete de firebase para poder usarlo
export default firebase