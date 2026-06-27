import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {

apiKey: "ضع_API_KEY_هنا",

authDomain: "ضع_AUTH_DOMAIN_هنا",

projectId: "ضع_PROJECT_ID_هنا",

storageBucket: "ضع_STORAGE_BUCKET_هنا",

messagingSenderId: "ضع_MESSAGING_SENDER_ID_هنا",

appId: "ضع_APP_ID_هنا"

};



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);



export {
app,
db,
auth,
storage
};