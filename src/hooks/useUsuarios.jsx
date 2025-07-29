import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const crearUsuario = async ({ usuario, contrasena, rol }) => {
  try {
    await addDoc(collection(db, 'usuarios'), {
      usuario,
      contrasena,
      rol
    });
    return true;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    return false;
  }
};
