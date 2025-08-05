import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Paper } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { crearUsuario } from '../hooks/useUsuarios';

const AltaProfesor = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    usuario: '',
    contrasena: '',
    materia: '',
    cursos: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userGuardado = await crearUsuario({
      usuario: form.usuario,
      contrasena: form.contrasena,
      rol: 'profesor'
    });

    if (!userGuardado) return;

    await addDoc(collection(db, 'profesores'), {
      nombre: form.nombre,
      apellido: form.apellido,
      dni: form.dni,
      materia: form.materia,
      cursos: form.cursos.split(',').map(c => c.trim())
    });

    alert("Profesor dado de alta correctamente");
    setForm({ nombre: '', apellido: '', dni: '', usuario: '', contrasena: '', materia: '', cursos: '' });
  };

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Alta de Profesor</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {['nombre', 'apellido', 'dni', 'usuario', 'contrasena', 'materia', 'cursos'].map((field) => (
            <Grid item xs={12} sm={6} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={form[field]}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">Guardar</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AltaProfesor;
