import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { getCurrentUser } from '../hooks/useAuth';

const AltaTurno = () => {
  const user = getCurrentUser();
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      setMensaje('Solo los administradores pueden registrar turnos.');
      return;
    }

    try {
      await addDoc(collection(db, 'turnos'), { nombre });
      setMensaje('Turno registrado correctamente.');
      setNombre('');
    } catch (error) {
      console.error(error);
      setMensaje('Error al registrar turno.');
    }
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5">Alta de Turno</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del turno"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">Guardar</Button>
        {mensaje && <Alert sx={{ mt: 2 }} severity="info">{mensaje}</Alert>}
      </form>
    </Paper>
  );
};

export default AltaTurno;
