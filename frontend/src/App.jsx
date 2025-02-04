import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

import PrivateRoute from './components/PrivateRoute';
import Expenses from './pages/Expenses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path='/expenses' element={<Expenses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
