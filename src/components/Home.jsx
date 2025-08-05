import React from 'react';
import { Typography, Grid, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth(); // usuario.rol debería estar definido

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Bienvenido/a {usuario?.usuario || ''} 👋
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Panel de control para el rol: <strong>{usuario?.rol}</strong>
      </Typography>

      <Grid container spacing={2} mt={2}>
        {usuario?.rol === 'admin' && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={() => navigate('/alta-profesor')}>
                Alta de Profesor
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={() => navigate('/alta-preceptor')}>
                Alta de Preceptor
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={() => navigate('/alta-materia')}>
                Alta de Materia
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={() => navigate('/alta-curso')}>
                Alta de Curso
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={() => navigate('/alta-horario')}>
                Alta de Horario
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={() => navigate('/alta-turno')}>
                Alta de Turno
              </Button>
            </Grid>
          </>
        )}

        {usuario?.rol === 'preceptor' && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <Button fullWidth variant="contained" onClick={() => navigate('/alta-tema')}>
                Alta de Tema
              </Button>
            </Grid>
          </>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
