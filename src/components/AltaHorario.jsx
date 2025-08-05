import React, { useState } from 'react';
import {
  Box, Button, Paper, Typography, TextField, MenuItem, Alert
} from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

const bloques = [
  "18:00 - 18:40",
  "18:40 - 19:20",
  "19:20 - 19:30 (Recreo)",
  "19:30 - 20:10",
  "20:10 - 20:50",
  "20:50 - 21:00 (Recreo)",
  "21:00 - 21:30",
  "21:30 - 22:00"
];

const AltaHorario = () => {
  const { usuario } = useAuth(); // Hook correcto

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

  if (!usuario || usuario.rol !== 'admin') {
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
          required
        />
        <TextField
          fullWidth
          label="Asignatura"
          name="asignatura"
          value={horario.asignatura}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Profesor"
          name="profesor"
          value={horario.profesor}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          select
          fullWidth
          label="Día"
          name="dia"
          value={horario.dia}
          onChange={handleChange}
          margin="normal"
          required
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
          required
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
