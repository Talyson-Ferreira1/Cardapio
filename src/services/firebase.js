/* import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const appId = process.env.NEXT_PUBLIC_APP_ID;
const measurementId = process.env.NEXT_PUBLIC_MEASUEMENTID;
const messagingSenderId = process.env.NEXT_PUBLIC_MESSAGINGSENDRENDERID;

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: 'cardapio-digital-40a58.firebaseapp.com',
  projectId: 'cardapio-digital-40a58',
  storageBucket: 'cardapio-digital-40a58.appspot.com',
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

export const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';

export const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
