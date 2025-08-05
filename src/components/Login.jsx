import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, TextField, Typography, Paper, Alert
} from '@mui/material';

const Login = ({ setUser }) => {
  const [credenciales, setCredenciales] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      // Si hay usuario en localStorage, redirigir a la página principal
      navigate('/login', { replace: true }); // replace elimina la página anterior del historial
    }
  }, []);

  const handleLogin = async () => {
    setError('');
    try {
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const userDoc = querySnapshot.docs.find(doc =>
        doc.data().usuario === credenciales.usuario &&
        doc.data().contrasena === credenciales.contrasena
      );

      if (userDoc) {
        //Array[10]= 
        const userData = { ...userDoc.data(), id: userDoc.id };

        if (!userData.rol) {
          setError('Tu cuenta no tiene un rol asignado. Contactá al administrador.');
          return;
        }

        setUser(userData);
        navigate('/');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error al autenticar:', err);
      setError('Error al conectarse. Intente de nuevo más tarde.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ mt: 10, p: 4 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Usuario"
          fullWidth
          margin="normal"
          value={credenciales.usuario}
          onChange={(e) => setCredenciales({ ...credenciales, usuario: e.target.value })}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={credenciales.contrasena}
          onChange={(e) => setCredenciales({ ...credenciales, contrasena: e.target.value })}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Ingresar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
