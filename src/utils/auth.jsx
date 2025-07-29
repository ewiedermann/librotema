export const puedeCrearProfesor = (user) => user.rol === 'preceptor' || user.rol === 'directivo';
export const puedeCrearPreceptor = (user) => user.rol === 'directivo';
export const puedeVisarTemas = (user) => user.rol === 'directivo' || user.rol === 'supervisor';
