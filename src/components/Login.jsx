import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, TextField, Typography, Paper, Alert
} from '@mui/material';

const Login = ({ setUser }) => {
  const [credenciales, setCredenciales] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const user = querySnapshot.docs.find(doc =>
      doc.data().usuario === credenciales.usuario &&
      doc.data().contrasena === credenciales.contrasena
    );

    if (user) {
      setUser({ ...user.data(), id: user.id });
      navigate('/');
    } else {
      setError('Credenciales incorrectas');
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
          <Button variant="contained" color="primary" onClick={handleLogin}>Ingresar</Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
