import {cert} from "firebase-admin/app"
import {initFirestore} from "@auth/firebase-adapter";

export const firestore = initFirestore({
    credential: cert({
        projectId: "*****",
        clientEmail: "******",
        privateKey: "******",
        // projectId: process.env.FIREBASE_PROJECT_ID,
        // clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // privateKey: process.env.FIREBASE_PRIVATE_KEY,
    })
})
