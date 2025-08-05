import React, { useEffect, useState } from 'react';
import { Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';
import dayjs from 'dayjs';

const ProfesorDashboard = () => {
  const { currentUser: user } = useAuth();
  const [temasHoy, setTemasHoy] = useState([]);
  const fechaHoy = dayjs().format('YYYY-MM-DD');

  useEffect(() => {
  const cargarTemasHoy = async () => {
    if (!user || user.rol !== 'profesor') return;
    const q = query(
      collection(db, 'temas'),
      where('profesor', '==', user.email),
      where('fecha', '==', fechaHoy)
    );
    const snapshot = await getDocs(q);
    const temas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTemasHoy(temas);
  };

  cargarTemasHoy();
}, [user, fechaHoy]); // ✅ Agregado fechaHoy

  return (
    <Paper sx={{ p: 4, mt: 3 }}>
      <Typography variant="h5">Temas del día ({fechaHoy})</Typography>
      <List>
        {temasHoy.length === 0 ? (
          <Typography>No tenés clases registradas para hoy.</Typography>
        ) : (
          temasHoy.map((tema) => (
            <React.Fragment key={tema.id}>
              <ListItem>
                <ListItemText
                  primary={`${tema.materia} - ${tema.curso}`}
                  secondary={`Tema: ${tema.tema} | Hora: ${tema.hora}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
};

export default ProfesorDashboard;
