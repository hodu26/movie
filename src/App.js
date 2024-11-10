import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import SignInUp from './page/SignInUp';

function App() {
  return (
    <Router basename="/movie">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignInUp />} />
      </Routes>
    </Router>
  );
}

export default App;
