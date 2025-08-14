// Importar SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBtrGBwQvD8AHP5T1R1XAoVc81dGwBTdfQ",
  authDomain: "librodetema-332a2.firebaseapp.com",
  projectId: "librodetema-332a2",
  storageBucket: "librodetema-332a2.firebasestorage.app",
  messagingSenderId: "673653562187",
  appId: "1:673653562187:web:2d33f52c37c0594230a6ce",
  measurementId: "G-NQ3JBQD0F5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Analytics (opcional)
const analytics = getAnalytics(app);

// Exportar Firestore
export const db = getFirestore(app);

// Exportar Auth
export const auth = getAuth(app);

// Persistencia: mantiene sesión activa
setPersistence(auth, browserLocalPersistence);

// Proveedor de Google
export const googleProvider = new GoogleAuthProvider();
