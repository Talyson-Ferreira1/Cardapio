

import { initializeApp } from "firebase/app";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const appId = process.env.NEXT_PUBLIC_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_MEASUEMENTID;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGINGSENDRENDERID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "cardapio-digital-40a58.firebaseapp.com",
  projectId: "cardapio-digital-40a58",
  storageBucket: "cardapio-digital-40a58.appspot.com",
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId:measurementId
};


export const app = initializeApp(firebaseConfig);