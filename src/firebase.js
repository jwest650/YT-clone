import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBvEjq6Dau61xA36bvEJVM0uG3d5IbZGME",

    authDomain: "fir-4d7ec.firebaseapp.com",

    projectId: "fir-4d7ec",

    storageBucket: "fir-4d7ec.appspot.com",

    messagingSenderId: "68091975688",

    appId: "1:68091975688:web:327e5a038393285fd619bd",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
