import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const AltaTema = ({ user }) => {
  const [tema, setTema] = useState({
    curso: '',
    materia: '',
    profesor: user.usuario,
    dia: '',
    bloque: '',
    descripcion: ''
  });

  const guardarTema = async () => {
    await addDoc(collection(db, "temas"), tema);
    alert("Tema registrado correctamente.");
  };

  return (
    <div>
      <h3>Alta de Tema</h3>
      <input placeholder="Curso" onChange={(e) => setTema({ ...tema, curso: e.target.value })} />
      <input placeholder="Materia" onChange={(e) => setTema({ ...tema, materia: e.target.value })} />
      <input placeholder="Día" onChange={(e) => setTema({ ...tema, dia: e.target.value })} />
      <input placeholder="Bloque" onChange={(e) => setTema({ ...tema, bloque: e.target.value })} />
      <textarea placeholder="Tema del día" onChange={(e) => setTema({ ...tema, descripcion: e.target.value })} />
      <button onClick={guardarTema}>Guardar</button>
    </div>
  );
};

export default AltaTema;
