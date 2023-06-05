import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
          apiKey: "AIzaSyDqSAkM-V4FcJx-vkZyOOe0xyw1LMcv5Ys",
          authDomain: "seproject-b0432.firebaseapp.com",
          projectId: "seproject-b0432",
          storageBucket: "seproject-b0432.appspot.com",
          messagingSenderId: "804728597985",
          appId: "1:804728597985:web:4c579de3415aa2775b36a0",
          measurementId: "G-4RDE6ELPGZ"
        }

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}
