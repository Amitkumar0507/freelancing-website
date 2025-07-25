// firebase.js
import admin from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";
dotenv.config();

// Path to your downloaded key file
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccountKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export { db , admin};
