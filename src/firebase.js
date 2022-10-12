import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTYn9g9O-b9ojlu6PPkfGSCrDxkFV6LnY",
  authDomain: "notes-app-134fe.firebaseapp.com",
  projectId: "notes-app-134fe",
  storageBucket: "notes-app-134fe.appspot.com",
  messagingSenderId: "301426235530",
  appId: "1:301426235530:web:db3684c79bf76e28e3b573",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const provider = new GoogleAuthProvider();

export { auth, provider };
