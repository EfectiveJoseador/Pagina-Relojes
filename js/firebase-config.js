import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";






const firebaseConfig = {
    apiKey: "AIzaSyC00S7gfZs8z4xTBcxRO1yH7GvPpr0k2p8",
    authDomain: "luxemodwatches-45a8d.firebaseapp.com",
    databaseURL: "https://luxemodwatches-45a8d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "luxemodwatches-45a8d",
    storageBucket: "luxemodwatches-45a8d.firebasestorage.app",
    messagingSenderId: "745890724417",
    appId: "1:745890724417:web:6f38919ab9125a8864e4c0",
    measurementId: "G-K981C567DL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export { app, auth, analytics, db };
