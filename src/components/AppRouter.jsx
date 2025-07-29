import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AltaProfesor from './AltaProfesor';
import AltaPreceptor from './AltaPreceptor';
import AltaMateria from './AltaMateria';
import AltaCurso from './AltaCurso';
import AltaHorario from './AltaHorario';
import AltaTurno from './AltaTurno';
import AltaTema from './AltaTema';
import Home from './Home'; // Pantalla principal del profesor con materias del día

const AppRouter = ({ user }) => {
  const isAdmin = user?.rol === 'admin';
  const isProfesor = user?.rol === 'profesor' || isAdmin;

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      {isAdmin && (
        <>
          <Route path="/alta-profesor" element={<AltaProfesor />} />
          <Route path="/alta-preceptor" element={<AltaPreceptor />} />
          <Route path="/alta-materia" element={<AltaMateria />} />
          <Route path="/alta-curso" element={<AltaCurso />} />
          <Route path="/alta-horario" element={<AltaHorario />} />
          <Route path="/alta-turno" element={<AltaTurno />} />
        </>
      )}
      {isProfesor && (
        <Route path="/alta-tema" element={<AltaTema user={user} />} />
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;

