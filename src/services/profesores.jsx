import {
  doc, setDoc, getDoc, updateDoc, getDocs, 
  collection,
  query, where, orderBy, limit
} from "firebase/firestore";
import { db } from "../firebase/firebase";

//insert(nombre=Exequiel Walter Fernando, apellido=wiedermann)
// INSERT / UPSERT (crea o pisa doc con ese DNI como ID)
export async function upsertProfesorByDni(dni, data) {
  const ref = doc(db, "profesores", dni);
  await setDoc(ref, { ...data, dni }, { merge: true }); // merge:true = UPSERT
  return dni;
}

// UPDATE (parcial) por DNI
export async function updateProfesorByDni(dni, partial, nombre) {
  const ref = doc(db, "profesores", dni, nombre);
  await updateDoc(ref, partial);
  return dni;
}
 
// SELECT 1 por DNI
//SELECT dni, nombre, apellido
//FROM profesores
//WHERE profesores.dni=dato
export async function getProfesorByDni(dni) {
  const ref = doc(db, "profesores", dni);
  const snap = await getDoc(ref);
 }

// SELECT lista (ej: por materia) — filtros simples
export async function listProfesores({ materia, top = 20 } = {}) {
  const base = collection(db, "profesores");
  const q = materia
    ? query(base, where("materia", "==", materia), orderBy("apellido"), limit(top))
    : query(base, orderBy("apellido"), limit(top));

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
