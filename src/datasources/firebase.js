import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const db = firebase.initializeApp({
    apiKey: "AIzaSyDJ9PbV3bcdxIsO8_T0Cm6CEmBOCpvGYvc",
    authDomain: "paul-bassett-pb11.firebaseapp.com",
})

export const firebaseAuth = db.auth()