import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase'; // ahora exportas auth desde firebase.jsx
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Container, TextField, Typography, Paper, Alert
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

const Login = ({ setUser }) => {
  const [credenciales, setCredenciales] = useState({ usuario: '', contrasena: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogin = async () => {
    setError('');
    try {
      const querySnapshot = await getDocs(collection(db, 'usuarios'));
      const userDoc = querySnapshot.docs.find(doc =>
        doc.data().usuario === credenciales.usuario &&
        doc.data().contrasena === credenciales.contrasena
      );

      if (userDoc) {
        const userData = { ...userDoc.data(), id: userDoc.id };

        if (!userData.rol) {
          setError('Tu cuenta no tiene un rol asignado. Contactá al administrador.');
          return;
        }

        setUser(userData);
        localStorage.setItem('usuario', JSON.stringify(userData));
        navigate('/');
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      console.error('Error al autenticar:', err);
      setError('Error al conectarse. Intente de nuevo más tarde.');
    }
  };

  // 📌 Login con Google
  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const userData = {
        usuario: result.user.displayName,
        email: result.user.email,
        foto: result.user.photoURL,
        uid: result.user.uid,
        rol: 'google_user'
      };
      setUser(userData);
      localStorage.setItem('usuario', JSON.stringify(userData));
      navigate('/');
    } catch (err) {
      console.error('Google Sign-In error:', err?.code, err?.message);

      // Fallback si el popup fue bloqueado
      if (err?.code === 'auth/popup-blocked' || err?.code === 'auth/cancelled-popup-request') {
        try {
          await signInWithRedirect(auth, provider);
          return;
        } catch (e2) {
          console.error('Redirect fallback error:', e2?.code, e2?.message);
        }
      }
      setError(`No se pudo iniciar sesión con Google (${err?.code || 'error-desconocido'}).`);
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
        <Box mt={2} display="flex" flexDirection="column" gap={2}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Ingresar
          </Button>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleLogin}
          >
            Ingresar con Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
