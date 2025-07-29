import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AppRouter from './components/AppRouter';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/*" element={user ? <AppRouter user={user} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;

