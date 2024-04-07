import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyCQQPWLba5M6GFpgFWYumfHDJ-DDwVeMjw",
    authDomain: "react-lab-4.firebaseapp.com",
    databaseURL: "https://react-lab-4-default-rtdb.firebaseio.com",
    projectId: "react-lab-4",
    storageBucket: "react-lab-4.appspot.com",
    messagingSenderId: "769304664048",
    appId: "1:769304664048:web:91d4be85a453cf178bef35",
    measurementId: "G-KX8GQP04H6"
  };

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;
