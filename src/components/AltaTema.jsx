import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';

const AltaTema = () => {
  const { currentUser: user } = useAuth();
  const [formulario, setFormulario] = useState({
    materia: '',
    curso: '',
    tema: '',
    fecha: '',
    hora: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.rol !== 'profesor') {
      setMensaje('Solo los profesores pueden registrar temas.');
      return;
    }

    try {
      await addDoc(collection(db, 'temas'), {
        ...formulario,
        profesor: user.email,
        timestamp: serverTimestamp()
      });
      setMensaje('Tema registrado correctamente.');
      setFormulario({ materia: '', curso: '', tema: '', fecha: '', hora: '' });
    } catch (error) {
      console.error(error);
      setMensaje('Error al guardar el tema.');
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5">Alta de Tema</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="materia"
          label="Materia"
          fullWidth
          value={formulario.materia}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="curso"
          label="Curso"
          fullWidth
          value={formulario.curso}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="tema"
          label="Tema del día"
          fullWidth
          value={formulario.tema}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="fecha"
          type="date"
          fullWidth
          value={formulario.fecha}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="hora"
          label="Bloque horario"
          fullWidth
          value={formulario.hora}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">Guardar</Button>
        {mensaje && <Alert sx={{ mt: 2 }} severity="info">{mensaje}</Alert>}
      </form>
    </Paper>
  );
};

export default AltaTema;
