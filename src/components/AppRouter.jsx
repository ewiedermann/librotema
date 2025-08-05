import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AltaProfesor from './AltaProfesor';
import AltaPreceptor from './AltaPreceptor';
import AltaMateria from './AltaMateria';
import AltaCurso from './AltaCurso';
import AltaHorario from './AltaHorario';
import AltaTurno from './AltaTurno';
import AltaTema from './AltaTema';
import ProfesorDashboard from './ProfesorDashboard';
import Home from './Home';
import { Typography, Box } from '@mui/material';

const AppRouter = ({ user }) => {
  const { rol } = user || {};
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      // Si el usuario intenta volver y está logueado, forzamos a quedarse en la ruta actual
      if (user && ['admin', 'preceptor', 'profesor'].includes(user.rol)) {
        navigate(window.location.pathname, { replace: true });
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user, navigate]);

  // 🔍 Fallback en caso de que el usuario no tenga rol válido
  if (!rol || !['admin', 'preceptor', 'profesor'].includes(rol)) {
    return (
      <Box p={4}>
        <Typography variant="h5" color="error">
          No tenés permisos para acceder. Por favor cerrá sesión e intentá nuevamente.
        </Typography>
      </Box>
    );
  }

  return (
    <Routes>
      {rol === 'admin' && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/alta-profesor" element={<AltaProfesor />} />
          <Route path="/alta-preceptor" element={<AltaPreceptor />} />
          <Route path="/alta-materia" element={<AltaMateria />} />
          <Route path="/alta-curso" element={<AltaCurso />} />
          <Route path="/alta-horario" element={<AltaHorario />} />
          <Route path="/alta-turno" element={<AltaTurno />} />
        </>
      )}

      {rol === 'preceptor' && (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/alta-tema" element={<AltaTema />} />
        </>
      )}

      {rol === 'profesor' && (
        <>
          <Route path="/" element={<ProfesorDashboard />} />
          <Route path="/alta-tema" element={<AltaTema />} />
        </>
      )}

      {/* Fallback a inicio para cualquier ruta no válida */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
