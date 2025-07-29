import React, { useState } from 'react';
import {
  Box, Button, Paper, Typography, TextField, MenuItem, Alert
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getCurrentUser } from '../hooks/useAuth';

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const bloques = [
  "18:00 - 18:40",
  "18:40 - 19:20",
  "19:20 - 19:30 (Recreo)",
  "19:30 - 20:00",
  "20:00 - 20:40",
  "20:40 - 20:50 (Recreo)",
  "20:50 - 21:20",
  "21:20 - 22:00"
];

const AltaHorario = () => {
  const user = getCurrentUser();

  const [horario, setHorario] = useState({
    curso: '',
    asignatura: '',
    profesor: '',
    dia: '',
    bloque: ''
  });

  const handleChange = (e) => {
    setHorario({ ...horario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!horario.curso || !horario.asignatura || !horario.profesor || !horario.dia || !horario.bloque) {
      alert('Completá todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, 'horarios'), horario);
      alert('Horario registrado correctamente');
      setHorario({ curso: '', asignatura: '', profesor: '', dia: '', bloque: '' });
    } catch (error) {
      console.error('Error al registrar horario:', error);
      alert('Error al guardar el horario');
    }
  };

  if (!user || user.rol !== 'admin') {
    return <Alert severity="error">Solo los administradores pueden registrar horarios.</Alert>;
  }

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>Alta de Horario</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Curso (Ej: Sexto Primera)"
          name="curso"
          value={horario.curso}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Asignatura"
          name="asignatura"
          value={horario.asignatura}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Profesor"
          name="profesor"
          value={horario.profesor}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Día"
          name="dia"
          value={horario.dia}
          onChange={handleChange}
          margin="normal"
        >
          {dias.map((d) => (
            <MenuItem key={d} value={d}>{d}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Bloque Horario"
          name="bloque"
          value={horario.bloque}
          onChange={handleChange}
          margin="normal"
        >
          {bloques.map((b) => (
            <MenuItem key={b} value={b}>{b}</MenuItem>
          ))}
        </TextField>
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" type="reset">Cancelar</Button>
          <Button variant="contained" type="submit" color="primary">Guardar</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default AltaHorario;
