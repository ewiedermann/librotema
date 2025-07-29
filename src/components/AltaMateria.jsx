import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getCurrentUser } from '../hooks/useAuth';

const AltaMateria = () => {
  const user = getCurrentUser();

  const [materia, setMateria] = useState({
    nombre: '',
    codigo: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setMateria({ ...materia, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!materia.nombre || !materia.codigo) {
      alert('Completá todos los campos obligatorios');
      return;
    }

    try {
      await addDoc(collection(db, 'materias'), materia);
      alert('Materia guardada con éxito');
      setMateria({ nombre: '', codigo: '', descripcion: '' });
    } catch (error) {
      console.error('Error al guardar la materia:', error);
      alert('Error al guardar la materia');
    }
  };

  if (!user || user.rol !== 'admin') {
    return <Alert severity="error">Solo los administradores pueden registrar materias.</Alert>;
  }

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>Alta de Materia</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre de la materia"
          name="nombre"
          value={materia.nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Código"
          name="codigo"
          value={materia.codigo}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Descripción"
          name="descripcion"
          value={materia.descripcion}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" type="reset">Cancelar</Button>
          <Button variant="contained" color="primary" type="submit">Guardar</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AltaMateria;
