import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Navbar from './components/Navbar';
import RegistroDocente from './components/RegistroDocente';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Container sx={{ flexGrow: 1, py: 4 }}>
        <RegistroDocente />
      </Container>
      <Box textAlign="center" py={2}>
        <Typography variant="body2" color="text.secondary">
          Sistema de Registro Docente © 2025
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
