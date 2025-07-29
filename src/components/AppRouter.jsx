// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import AltaProfesor from '../components/AltaProfesor';
import AltaPreceptor from '../components/AltaPreceptor';
import AltaMateria from '../components/AltaMateria';
import AltaCurso from '../components/AltaCurso';
import AltaTurno from '../components/AltaTurno';
import AltaHorario from '../components/AltaHorario';
import AltaTema from '../components/AltaTema';
import { useAuth } from '../hooks/useAuth';

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {user ? (
          <>
            <Route path="/" element={<Dashboard />} />
            {user.rol === 'admin' && <Route path="/alta-profesor" element={<AltaProfesor />} />}
            {user.rol === 'admin' && <Route path="/alta-preceptor" element={<AltaPreceptor />} />}
            {user.rol === 'admin' && <Route path="/alta-materia" element={<AltaMateria />} />}
            {user.rol === 'admin' && <Route path="/alta-curso" element={<AltaCurso />} />}
            {user.rol === 'admin' && <Route path="/alta-turno" element={<AltaTurno />} />}
            {user.rol === 'admin' && <Route path="/alta-horario" element={<AltaHorario />} />}
            {(user.rol === 'admin' || user.rol === 'profesor') && <Route path="/alta-tema" element={<AltaTema />} />}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
