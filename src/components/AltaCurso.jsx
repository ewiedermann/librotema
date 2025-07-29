import React, { useState } from 'react';
import { Box, Button, Paper, TextField, Typography, Alert } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getCurrentUser } from '../hooks/useAuth';

const AltaCurso = () => {
  const user = getCurrentUser();

  const [curso, setCurso] = useState({
    nombre: '',
    division: '',
    turno: ''
  });

  const handleChange = (e) => {
    setCurso({ ...curso, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!curso.nombre || !curso.division || !curso.turno) {
      alert('Completá todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, 'cursos'), curso);
      alert('Curso guardado con éxito');
      setCurso({ nombre: '', division: '', turno: '' });
    } catch (error) {
      console.error('Error al guardar curso:', error);
      alert('Error al guardar curso');
    }
  };

  if (!user || user.rol !== 'admin') {
    return <Alert severity="error">Solo los administradores pueden registrar cursos.</Alert>;
  }

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>Alta de Curso</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nombre (Ej: Sexto)"
          name="nombre"
          value={curso.nombre}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="División (Ej: Primera)"
          name="division"
          value={curso.division}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Turno (Ej: Vespertino)"
          name="turno"
          value={curso.turno}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" type="reset">Cancelar</Button>
          <Button variant="contained" type="submit" color="primary">Guardar</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AltaCurso;
