import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
          apiKey: import.meta.env.VITE_APP_ID,
          authDomain: import.meta.env.VITE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_APP_ID,
          measurementId: import.meta.env.VITE_MEASUREMENT_ID
        }

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}
