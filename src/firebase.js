import { Platform } from "react-native";
import { getApp, getApps, initializeApp } from "firebase/app";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB49vTan1l_82kLzDcTEblL-9-SkUhibsI",
  authDomain: "web-app-7b6e6.firebaseapp.com",
  projectId: "web-app-7b6e6",
  storageBucket: "web-app-7b6e6.firebasestorage.app",
  messagingSenderId: "398343848759",
  appId: "1:398343848759:web:c873cfc05313df3ca0d0b2",
  measurementId: "G-D8659JTLP6"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (_err) {
    auth = getAuth(app);
  }
}

export { auth, db };
